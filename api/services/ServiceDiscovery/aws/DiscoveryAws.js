const DiscoverySource = require('../AbstractDiscoveryService'),
    mongoose = require('mongoose'),
    Server = require('../../../db/models/ServerModel');
process.env.AWS_PROFILE= '~/.aws/credentials';
var AWS = require('aws-sdk'),
    credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Create EC2 service object
class AwsDiscoverySource extends DiscoverySource{
    constructor(){
        super();//TODO: have constructor return this as an initialized connection and extract the functionality to a helper/util class
    }
    getAllServers(){

    }
    async getServersFromRegion(region){
        AWS.config.update({region: region});
        let ec2 = new AWS.EC2();
        let self = this;
        return await ec2.describeInstances(function(err, data) {
            if (err) {
                console.log("Error", err.stack);
            } else {
                console.log("Success", JSON.stringify(data));
                console.log(self.convertAwsEntitiesToServers(data))
            }
        });
    }
    convertAwsEntitiesToServers(servers){
        let serverList = [];
        servers.Reservations.forEach(server=>{
            server.Instances.forEach(instance=>{
                serverList.push(new Server(this.createNewAwsServer(instance)))
            })
        });
        return serverList;
    }
    createNewAwsServer(instance){
        return {
            discovered_date : Date.now(),
            ip_addr : instance.PrivateIpAddress,
            dns_name : instance.PrivateDnsName,
            status : instance.State.Name, //TODO: check if values are ok with the enum we defined in serverModel
            name: this.getAwsInstanceName(instance.Tags)
            //TODO: check other AWS server properties
        }
    }
    getAwsIpAddresses(ipAddresses){ //TODO: fix this
        let retIpAddressArr = [];
        ipAddresses.forEach(ipAddress=>{
            retIpAddressArr.push(ipAddress)
        })
    }
    getAwsInstanceName(tags){
        let instanceName = undefined;
        tags.forEach(tag => {
            if (tag.Key === 'Name') instanceName = tag.Value;
        });
        if (instanceName === undefined){
            return '';
        } else {
            return instanceName;
        }
    }

}
let aws = new AwsDiscoverySource();
aws.getServersFromRegion('us-west-2').then((res)=>{
   // aws.updateServersInDb(res)
});