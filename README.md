# QuickHire

QuickHire is a full‑stack hiring platform with a public job board and an admin dashboard for managing jobs, applications, and company info.

## What’s inside

- **Client (Next.js)**: Public site, job search, job detail, application form.
- **Admin (Next.js)**: Dashboard, jobs CRUD, applicants, company profile, stats.
- **Server (Express + MongoDB)**: REST API for jobs, applications, company, and stats.

## Highlights

- **Modular and reusable components** across client and admin UIs.
- **Organized API structure** with feature‑based modules (jobs, applications, company, stats).
- **Consistent API responses** with `{ success, data }` or `{ success, message }`.

## Local setup

### 1) Clone and install dependencies

```
git clone https://github.com/mehedi-hridoy/QuickHire.git
cd QuickHire

# Server
cd server
npm install

# Admin
cd ../admin
npm install

# Client
cd ../client
npm install
```

### 2) Environment variables

Create a `.env` file in the **server** directory:

```
PORT=5000

# Use either MONGODB_URI or DB_USER + DB_PASS
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.ar9nb8e.mongodb.net/QuickHire

# If not using MONGODB_URI
DB_USER=your_user
DB_PASS=your_pass
DB_NAME=QuickHire
```

Client and Admin are preconfigured to use localhost defaults. If you want to customize:

- **Client**: `NEXT_PUBLIC_API_URL` (default `http://localhost:5000`)
- **Admin**: `NEXT_PUBLIC_API_URL` (default `http://localhost:5000/api`)

Create a `.env.local` in `client/` and/or `admin/` if needed:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3) Run locally

In separate terminals:

```
# Server
cd server
npm run dev
```

```
# Admin (http://localhost:3000)
cd admin
npm run dev
```

```
# Client (http://localhost:3001)
cd client
npm run dev
```

## Project structure

```
server/
	src/
		modules/
			jobs/
			applications/
			company/
			stats/
		utils/

admin/
	src/
		app/
		components/
		features/
		services/

client/
	app/
	components/
	features/
```

## Notes

- Admin login is a **demo** login (hardcoded):
	- Email: `admin@gmail.com`
	- Password: `admin`
- API responses are standardized for predictable frontend handling.
