const { spawn } = require('child_process');

let successfulRuns = 0;

function getRandomTimeout(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function runBot() {
  const child = spawn('npm', ['run', 'test:unit', 'bot/index.spec.ts'], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('error', (error) => {
    console.error('Error occurred while running the tests:', error);
  });

  child.on('exit', (code) => {
    if (code === 0) {
      successfulRuns++;
      console.log(
        `👍🏻Tests completed successfully. Bot has run successfully ${successfulRuns} time(s). Re-running in 5 seconds...`
      );
    } else {
      console.log(
        `❌ Tests failed. Bot has run successfully ${successfulRuns} time(s). Re-running in 5 seconds...`
      );
    }
    const randomTimeout = getRandomTimeout(5000, 10000);
    setTimeout(runBot, randomTimeout); // Restart the bot after a random timeout between 5000ms and 10000ms, regardless of success or failure
  });
}

runBot(); // Start the bot
