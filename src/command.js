/* @flow */
interface Command {
	execute(actor:Actor) : void;
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

class Actor {
	execute(command: Command){
		command.execute(this);
	}
	subscribe(queue: CommandQueue) {
		queue.subscribe(this);
	}
}

// AI => command queue => Actor
class CommandQueue {
	subs: Array<Actor>;
	constructor () {
		this.subs = [];
	}
	
	subscribe(actor: Actor){
		this.subs.push(actor);
	}

	publish(command: Command) {
		this.subs.forEach((sub) => {
			sub.execute(command);
		});
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

