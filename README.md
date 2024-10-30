# Discord Bot

## Requirements
Before you can use this bot, you will need to create a project on the following platforms and obtain the necessary credentials.

### Discord Bot
You will need to create a Discord Bot at https://discord.com/developers/applications.
This is the same place where you can find your bot's client ID and token.

### YouTube API
You will need to create a YouTube API key at https://console.developers.google.com/apis.
Enable the YouTube Data API v3 for your project and create an API key.

## Install
````bash
cp .env.example .env
npm install
````

## Run
````bash
npm start
````

## Documentation

### Commands
The bot uses a command pattern to implement commands. The base class is located at [src/commands/_command.js](src/commands/_command.js).

#### Creating a new Command
The following steps will guide you to make a simple command that displays the current time.

1. **Create a new command file**

Create a new file in the [src/commands](src/commands) directory and extend the base class. The file name should be the command name in camelCase, for example `time.js`.

2. **Create a new class that extends the base class**

The class should be named the same as the file name but in PascalCase. For example, the class name should be `Time` for the file `time.js`.
Also, the class should be exported as default and extend the base class.
See the example below:
```javascript
export default class Time extends Command {
}
```

3. **Implement the class constructor**

The base class constructor expects the following parameters:
- `name` - The command name entered by the user on Discord, for example `/time`.
- `description` - The command description that will be displayed on Discord when entering the command.

You must, therefore, inject these parameters into the super constructor.
See the example below:
```javascript
export default class Time extends Command {
  constructor() {
    super(
        'time', // The command name 
        'Display the current time' // The command description
    );
  }
}
```

4. **Implement the `execute` method**

The `execute` method is called when the command is executed by the user. This method is called with a single parameter called `interaction` which is an instance of the `Interaction` class from the Discord.js library. The `interaction` object contains a method called `reply` which can be used to send a message back to the user.

You must, therefore, implement the `execute` method in your command class with logic to handle the reply to the user. 
See the example below:
```javascript
export default class Time extends Command {
  constructor() {
    super('time', 'Display the current time');
  }

  async execute(interaction) {
    // Create a string with a message containing the current time
    const text = `The current time is: ${new Date().toLocaleTimeString()}`;

    // Send the message back to the user on Discord who executed the command (/time)
    await interaction.reply(text);
  }
}
```

5. **Test the command**

You can now test the command by running the bot and entering the command on Discord.
Note: You may need to restart the bot if it is already running to register the new command.