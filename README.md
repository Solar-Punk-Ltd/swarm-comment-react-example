# Swarm Comment React Example ⚛️🐝💬

This project provides an example React application demonstrating real-time, decentralized comment functionality built on Swarm. It utilizes the following core components:

- **[Solar-Punk-Ltd/swarm-comment-js Library](https://github.com/Solar-Punk-Ltd/swarm-comment-js):** The client-side library that handles Swarm interactions for sending and receiving messages.
- **[Solar-Punk-Ltd/comment-system](https://github.com/Solar-Punk-Ltd/comment-system):** A client-side library providing reading and writing a graffiti feed for the messages and reactions.

This example showcases how to integrate `swarm-comment-js` into a React frontend to create a functional comment interface.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) (or npm)
- Access to one or more running Swarm Bee nodes:
  - One for the client application to connect to (swarm-comment-js).

---

## 🚀 Getting Started

Follow these steps to get the example application up and running:

### 1\. Clone the Repository

```bash
git clone https://github.com/Solar-Punk-Ltd/swarm-comment-react-example.git
cd swarm-comment-react-example
```

### 2\. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 4\. Configure the React Example

This application uses environment variables for configuration. Create a `.env` file in the root of the `swarm-comment-react-example` project directory. You can copy the `.env.example` file if one is provided:

```bash
cp .env.example .env
```

Now, edit the `.env` file with the necessary values. These correspond to the `CommentSettings` required by the `swarm-comment-js` library:

```env
# .env

VITE_BEE_URL= Address of the node that will be used by swarm-comment-js
VITE_COMMENT_STAMP = Stamp used to write to the comment


```

### 5\. Run the Application

Once configured, start the development server:

```bash
pnpm run dev
# or
npm run dev
```

---

## 🧐 Understanding the Code

The core integration with `swarm-comment-js` can typically be found in:

- A custom React hook (e.g., `src/hooks/useSwarmComment.ts` if you've structured it that way, similar to the example in the `swarm-comment-js` README).

The `CommentSettings` object, populated from the environment variables, is passed to the `SwarmComment` constructor from the `swarm-comment-js` library.

---

## 📌 Important Notes

- **Example Only:** This application is an _example_ to demonstrate functionality. It may lack features, robust error handling, or security measures found in a production application.
- **Private Key Handling:** The method for handling keys in this example is for demonstration purposes. Secure private key management is critical for real applications.
- **Swarm Network:** Ensure your Bee nodes are properly connected to the Swarm network and have sufficient funds/postage stamps for operations.

---
