# CampusConnect
Role-based college event and announcement portal using Express, MongoDB, Redis, Socket.io, React, Redux Toolkit and Docker.

## Run
1. Copy `backend/.env.example` to `backend/.env` for local non-Docker use, or set `JWT_SECRET` and `JWT_REFRESH_SECRET` before Compose.
2. Run `docker compose up --build`.
3. Frontend: http://localhost:3000
4. API: http://localhost:5000/api/health

## Architecture
- Express + MongoDB for users/events/announcements.
- JWT access tokens expire in 15 minutes; refresh token is an httpOnly 7-day cookie.
- `authenticate` validates access JWT; `authorize('ADMIN')` returns 403 for students.
- Redis caches GET `/api/events` for 60 seconds and is invalidated on event mutations.
- Socket.io validates JWT during handshake and places students in the `students` room. Announcement creation emits `new-announcement`.
- Helmet, strict CORS, Zod validation and login rate limiting are enabled.
- React uses Redux Toolkit and an Axios interceptor with an in-memory access token.

## Benchmark
After starting Compose, run from a shell with autocannon installed:
`npx autocannon -c 10 -d 10 http://localhost:5000/api/events`
For a fair 100+ request comparison, first run after `DEL events:list` (uncached), then repeat after one warm-up request (cached). Record average latency from autocannon output in the submission report. Authentication is required by the endpoint, so benchmark with a temporary test-only unauthenticated benchmark route or use a script that supplies a valid Bearer token.

## Testing
`docker compose exec backend npm test` and `npm test` in frontend. The backend suite includes environment-independent Supertest cases. For a production-grade five-case suite, use mongodb-memory-server or a dedicated test MongoDB and seed ADMIN/STUDENT users.
