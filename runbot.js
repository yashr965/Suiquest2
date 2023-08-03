const { spawn } = require('child_process');

let successfulRuns = 0;

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
        `👍🏻 Tests completed successfully. Bot has run successfully ${successfulRuns} time(s). Re-running in 5 seconds...`
      );
    } else {
      console.log(
        `❌ Tests failed. Bot has run successfully ${successfulRuns} time(s). Re-running in 5 seconds...`
      );
    }
    setTimeout(runBot, 5000); // Restart the bot after a 5-second delay, regardless of success or failure
  });
}

runBot(); // Start the bot