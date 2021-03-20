import { KeyboardHandler } from "./KeyboardHandler";


export enum KeyCommand {
    MoveForward = 'MoveForward',
    MoveBackward = 'MoveBackward',
    TurnLeft = 'TurnLeft',
    TurnRight = 'TurnRight'
}

export class KeyChecker {
    private keyboard: KeyboardHandler;

    constructor(keyboard: KeyboardHandler) {
        this.keyboard = keyboard;
    }

    getActiveCommands(): KeyCommand[] {
        const commands: KeyCommand[] = [];

        this.keyboard.activeKeys.forEach(key => {
            switch(key) {
                case 'w':
                    commands.push(KeyCommand.MoveForward)
                break;
                case 's':
                    commands.push(KeyCommand.MoveBackward)
                break;
                case 'a':
                    commands.push(KeyCommand.TurnLeft);
                break;
                case 'd':
                    commands.push(KeyCommand.TurnRight);
                break;
            }
        });

        return commands;
    }

    isMoveForward(): boolean {
        return this.getActiveCommands().includes(KeyCommand.MoveForward);
    }

    isMoveBackward(): boolean {
        return this.getActiveCommands().includes(KeyCommand.MoveBackward);
    }

    isTurnLeft(): boolean {
        return this.getActiveCommands().includes(KeyCommand.TurnLeft);
    }

    isTurnRight(): boolean {
        return this.getActiveCommands().includes(KeyCommand.TurnRight);
    }
}