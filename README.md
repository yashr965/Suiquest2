# Sui Quest 2 Bot => scallop.io

This is a simple bot script written in Node.js that runs the tests defined in `index.spec.ts` and restarts the tests after completion, whether they succeed or fail.

## Prerequisites for Windows / mac

Before running the bot, make sure you have the following installed on your system:

- Node.js (https://nodejs.org)
- git cli (https://git-scm.com/downloads)
- vs code (https://code.visualstudio.com/download)

## Prerequisites for linux 

- Node.js (https://nodejs.org)
- sudo apt update
- sudo apt upgrade
- git cli (https://git-scm.com/downloads)

## Installation / Configuration

1. Clone this repository to your local machine.

```bash
git clone https://github.com/0xAnaya/Suiquest2
cd Suiquest2

```
2. Install the required dependencies ``` npm install ```. [node version 18+ is recomendend]
3. Create a .env file and add replace your pvtkey and mnemonics here
```# #THIS IS THE PVT KEY OF YOUR WALLET !
SECRET_KEY="REPLACE WITH YOUR PRIVATE KEY "
# Any mnemonics you owned.
MNEMONICS="REPLACE WITH YOUR SEED KEYS!"
```
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/986031b1-5adf-443a-9025-672a71a25f03)

4. Go to `bot` Folder then `index.spec.ts` file and check these lines if you wanted to change !! [at start there is 1 SUI Used u can set it at any number] 
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/98e021be-ea80-485d-b23b-043106524ddd)
6. Now check runbot.js file present in the main directory ! If you want any changes in the timeout you can set it any time delay default delay is 5-10 seconds you can set it to 100-1000 secs or any amount. [note that : 1000 ms = 1 Seconds so write according to that ] 
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/bd0cc2f4-8566-4c72-8c3e-e4d86d8d3fa4)


7. Dont foget to change at every place after "sui" is there u can use `Ctrl + f` to find the places to change u can write : 1.9 or 9.99 or 0.99 any amount.
8. Next head over to : `https://app.scallop.io/` lending part ! and then you can click withdraw. to take out the SUI. TO be on the safer side we have added that on every time bot is run once it adds 1 SUI to deposite ! 
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/3922bf03-02cf-42a0-95a5-17f6942e32e8)
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/722bb18d-2578-45a6-a621-1e0ccde4c020)
9. Also 1 SUI is added in the Collateral part ! to be on safer side !! so when ever needed You can take it out as per your choice
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/f2961fcf-4488-4fe1-820f-8971c0756d65)

# Run bot 

1. simply open the terminal and run : ```node runbot.js``` command ! Make sure u are in the same directory where the bot is installed !
![image](https://github.com/0xAnaya/Suiquest2/assets/95902545/80894f75-15bb-4317-88dc-bf96f0867b2f)
2. To stop the bot simple press `ctrl + c` 2-4 times 

# Features

🌟 Features Perform All the DApp TXs in Under 2 Minutes ⏱️

🔗 Seamlessly interact with SUI Quest 2 platform

💬 Instantly Get Obligations

💼 Deposit & Withdraw Collateral

💰 Deposit & Withdraw Assets

📝 Borrow & Repay Assets

💸 Experience Flash Loans

👉🏼 Automate TXs Effortlessly! ⚡️

Thanks a lot enojoy your Sui Quest 2 bot : #scallop


