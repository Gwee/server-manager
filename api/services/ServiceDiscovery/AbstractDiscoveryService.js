class DiscoveryService{
    constructor(){

    }
    getServersFromRegion(){

    }
    getAllServers(){

    }
    updateServersInDb(serverObj){
        serverObj.forEach(server=> server.save(function(err){
            if (err) console.log(err);
            else console.log('inserted successfully');
        }))
    }
}
module.exports = DiscoveryService;