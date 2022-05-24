/* Run this code freshly after installing Augments */
/** @param {NS} ns */
export async function main(ns) {
	// Array of all servers that don't need any ports opened
	// to gain root access. These have 16 GB of RAM
	var servers0Port = [];

	// Array of all servers that don't need any ports opened
	// to gain root access. These have 32 GB of RAM
	var servers1Port = [];

	// Copy our scripts onto each server that requires 0 ports
	// to gain root access. Then use nuke() to gain admin access and
	// run the scripts.
	for (var i = 0; i < servers0Port.length; ++i) {
    	var serv = servers0Port[i];

    	await ns.scp("hack.js", serv);
		await ns.scp("weaken.js", serv);
		await ns.scp("grow.js", serv);
		ns.nuke(serv);
		// Threads for 16GB servers
		ns.exec("hack.js", serv, 1);
		ns.exec("weaken.js", serv, 6);
		ns.exec("grow.js", serv, 2);
	}

	// Wait until we acquire the "BruteSSH.exe" program
	while (!ns.fileExists("BruteSSH.exe")) {
 		await ns.sleep(60000);
	}

	// Copy our scripts onto each server that requires 1 port
	// to gain root access. Then use brutessh() and nuke()
	// to gain admin access and run the scripts.
	for (var i = 0; i < servers1Port.length; ++i) {
    	var serv = servers1Port[i];

    	await ns.scp("hack.js", serv);
		await ns.scp("weaken.js", serv);
		await ns.scp("grow.js", serv);
		ns.brutessh(serv);
		ns.nuke(serv);
		// Threads for 32GB servers
		ns.exec("hack.js", serv, 2);
		ns.exec("weaken.js", serv, 12);
		ns.exec("grow.js", serv, 4);
	}
	
}
