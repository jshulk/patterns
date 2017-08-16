/* @flow */
interface Command {
	execute() : void;
}

class JumpCommand implements Command{
	
	execute(actor){
		console.log("jump");
	}
}

class FireCommand implements Command{
	execute (actor){
		console.log("fire");
	}
}

// AI => command queue => Actor

class CommandQueue {
	constructor () {
		this.subs = [];
	}
	
	subscribe(actor){
		this.subs.push(actor);
	}

	publish(command) {
		this.subs.forEach((sub) => {
			sub.execute(command);
		});
	}

}

class Actor {
	execute(command){
		command.execute(this);
	}
	subscribe(queue) {
		queue.subscribe(this);
	}
}

const cmdQueue = new CommandQueue();
const actor = new Actor();

actor.subscribe(cmdQueue);

class AI {
	constructor () {
		
	}
	trigger(){
		cmdQueue.publish(new JumpCommand());
	}
}

