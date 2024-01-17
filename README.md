### Prerequisites

Node version (18 or 18+)

```Folder Structure:
    types: types for all the fiels
    api & actions: It has apis for the backend for prisma for inserting see,session,fetching user register and login.
    components: Folder for all the common components
    cotext: Context for the
    hooks: custom hooks for the features
    libs: Library conrigurations like for prisma
    users: folder for users
    util: it ahs all the external utilities or custom instance that are being used isnide the website

    For UI:-
        There is always be two file one that has UI and one that is hook for business logic.
        for exanmple:
            header.tsx: UI File
            useHeader: business logic for the header component.

```

### Cloning the repository

```shell
git clone
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
Values are mentioned in the e-mail I have sent details with.
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```
