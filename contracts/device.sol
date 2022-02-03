// contract for adding device
pragma solidity ^0.8.10;

contract device {
    address[] deviceAddr;
    bytes32[] mobileOwner;
    bytes32[] h;
    bytes32[] t;

    struct iotFeed {
        bytes32 hum;
        bytes32 temp;
        address userId;
    }

    iotFeed[] sensorFeed;

    mapping(address => bool) public devices;

    function addDevice(bytes32 mOwner) public {
        require(!devices[msg.sender]);
        devices[msg.sender]=true;
        deviceAddr.push(msg.sender);
        mobileOwner.push(mOwner);
    }
    
    function viewDevices() public view returns (address[] memory, bytes32[] memory) {
        return(deviceAddr,mobileOwner);
    }

    function storeFeed(bytes32 hum, bytes32 temp) public {
        require(devices[msg.sender]);
        iotFeed memory new_feed= iotFeed(hum,temp,msg.sender);
        sensorFeed.push(new_feed);
    }
    
    function viewFeed() public returns (bytes32[] memory,bytes32[] memory) {
        require(devices[msg.sender]);
        
        for(uint i=0;i<sensorFeed.length;i++) {
            if(sensorFeed[i].userId==msg.sender) {
                h.push(sensorFeed[i].hum);
                t.push(sensorFeed[i].temp);
            }
        }
        return (h,t);
    }
}

