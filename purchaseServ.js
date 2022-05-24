// How much RAM each purchased server will have. In this case, it'll
// be 128GB.
var ram = 128;

// Array to hold our servers
var server32 = ["hong-fang-tea", "max-hardware", 
                "harakiri-sushi", "nectar-net", "iron-gym",
                "zer0", "omega-net", "neo-net"];

// Iterator we'll use for our loop
var i = 0;


// Continuously try to purchase servers until we've reached the maximum
// amount of servers
while (i < getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
        // If we have enough money, then:
        //  1. Purchase the server
        //  2. Copy our hacking script onto the newly-purchased server
        //  3. Run our hacking script on the newly-purchased server with 3 threads
        //  4. Increment our iterator to indicate that we've bought a new server
        var hostname = purchaseServer("basilServ-" + i, ram);
		scp("hack.js", hostname);
		scp("weaken.js", hostname);
		scp("grow.js", hostname);
        // For loop for changing server being hacked
        for(var j = 0; j < server32.length; ++j){
            var serv = server32[j];
		    // Threads for 128GB servers
		    exec("hack.js", hostname, 8, serv);
		    exec("weaken.js", hostname, 48, serv);
		    exec("grow.js", hostname, 16, serv);
        }
        ++i;
    }
}
