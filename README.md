# 📜 Axioms

Axioms provides organizations a one-stop shop for certificate issuance and verification. Organizations are Safe Multi-Sig Wallets. Certificates are stored indefinitely on Arweave and user verification is done with zkProofs via Sismo Connect.

Live App - https://axioms-alpha.vercel.app/

---

## Description

Axioms is a platform for organizations to create and issue certificates. It uses a variety of technologies, such as safe multi-signature wallets, zkProofs, and Arweave, to make the process simple, secure, and seamless.

One of the problems that Axioms solves is the lack of user verification in traditional certification systems. For example, at an online event, organizers might distribute certificates of attendance to participants. However, there is no way to verify that the participants are real without requesting their personal information. Axioms uses zkProofs to selectively disclose personal data where needed, while maintaining user privacy.

Another problem that Axioms solves is the issue of certificate storage. Traditional certificates can be lost or destroyed, but certificates stored on Arweave are permanent.

Currently, Axioms supports the issuance of Proof of Attendance/Participation (POAP) certificates, which are unique certificates that can be shared between multiple users such as Hackathon participant certificate or Event Attendance Certificate. However, the platform can be integrated with multiple certificate types, such as 1:1 unique certificates.

Axioms also provides tools to make the certification process easier. For example, you can upload an Excel file of all the participants in a hackathon and a certificate template, and Axioms will automatically issue certificates to all of the participants.

---

## How it's Made 🛠️

### Safe Multi-Signature Wallets

The backbone of Axioms is the safe multi-signature wallet. Organizations can create new organizations in the form of safe multi-sig wallets or import existing wallets. This ensures that all decisions related to certificate issuance are made by a group of people, rather than by a single individual.

### Issuing Certificates

To issue a certificate, an organization needs to provide the addresses of the holders of the certificate. This can be done manually or by importing an Excel or CSV file. The Excel or CSV file can also include other information, such as the certificate holder's name, email address, and Twitter handle. This information will be embedded in the certificate's NFT attributes.

Organizations can also select different types of user verification. Currently, Axioms supports Twitter, GitHub, Lens profile, Gitcoin passport, ENS domains, and Proof of Humanity. This can be expanded in the future.

Once the organization has provided all of the necessary information, the certificate and associated data are uploaded to Arweave using Irys.

### Deploying Certificate Contracts

Once all of the details are in place, any safe owner can propose to issue a new certificate contract. This contract is a soulbound NFT smart contract where the first layer of verification occurs through a Merkle tree whitelist. This ensures that only authorized holders can claim the certificates.

Once a threshold of signatures are done, any owner can execute the transaction and the contract is deployed.

### Claiming Certificates

Once a contract is deployed, users can interact with the contract to claim their certificates. The claiming process is as follows:

Users visit the certification page.
They generate and verify zkProofs using Sismo data vaults.
Once the proofs are verified, the smart contract is called with the Merkle proofs for that address.
Once all are verified, a soulbound token is issued to the user.

---

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2Fztpae%2Fimages%2F1.png" alt="Homepage" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2Fztpae%2Fimages%2F2.png" alt="Create Game" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2Fztpae%2Fimages%2F3.png" alt="Game Page" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2Fztpae%2Fimages%2F4.png" alt="Game Page" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2Fztpae%2Fimages%2F5.png" alt="Game Page" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://storage.googleapis.com/ethglobal-api-production/projects%2Fztpae%2Fimages%2F6.png" alt="Game Page" >
    </td>
  </tr>
</table>

---

## Video Demo 🎥

![Axioms](https://i.ibb.co/PrKLdJX/OG.png)

https://youtu.be/9rAgqT6YUqU

---

## Tech Stack 💻

- [thirdweb](https://thirdweb.com/) - Wallet Connection + Smart Contracts
- [antd](https://ant.design/) - UI Design
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) - Front-end
- [Arweave](https://www.arweave.org/) - Permanent Storage
- [Safe AA SDK](https://safe.global/core) - Multi Sig Wallets
- [Sismo Connect](https://sismo.io/) - zkProofs

---

## Getting Started 🚀

### 📝 Smart Contract

To get started with Axiom smart contracts, follow these steps:

1. Navigate to the `contracts` directory and locate the contracts under the `contracts` folder.
2. Install the necessary dependencies by running the following command:
   ```bash
   pnpm install
   ```
   Set the required Environment Variables
3. To run tests, you can run the following command
   ```bash
   npx hardhat test
   ```

---

### 📱 Axiom Frontend

To get started with the Frontend app, follow these steps:
Navigate to the `app` directory and install the necessary dependencies by running the following command:

```bash
pnpm install
```

Create a new file called `.env.local` in the root directory of the `app`. This file will contain the required environment variables.
Inside the `.env.local` file, add the following environment variables:

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=''
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID='your_wallet_connect_project_id'
NEXT_PUBLIC_ENV='development'
NEXT_PUBLIC_SISMO_APP_ID='your_sismo_app_id'
```

To obtain the thirdweb Client Id, you can visit the [thirdweb Dashboard](https://thirdweb.com/dashboard) and retrieve the API key from there. For Sismo App Id we can get it from [Sismo Dashboard](https://factory.sismo.io/apps-explorer).

Once you have filled in the environment variables in the `.env.local` file, you can start the development server by running the following command:

```bash
pnpm run dev
```

Open your web browser and navigate to http://localhost:3000 to access the Skybet app.

By following these steps, you will be able to set up and run the Axioms front-end app on your local development environment.

---
