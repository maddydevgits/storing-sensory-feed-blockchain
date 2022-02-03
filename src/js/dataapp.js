App = {

	web3Provider:null,
	contracts: {},

	init: async function() {

		return await App.initWeb3();
	},

	initWeb3: function() {

		if(window.web3) {
			App.web3Provider = window.web3.currentProvider;
		}
		else {
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
		}

		web3 = new Web3(App.web3Provider);
		return App.initContract();
	},

	initContract: function() {

		$.getJSON('device.json',function(data){

			var registerArtifact = data;
			App.contracts.register = TruffleContract(registerArtifact);
			App.contracts.register.setProvider(App.web3Provider);

		});
			return App.loginUser();
	},

	loginUser: function() {
		
		var registerInstance;
		
		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			App.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.viewDevices.call();

			}).then(function(result){

				var adddr=[];
				var mobile=[];

				for(var k=0;k<result[0].length;k++)
				{
					adddr[k]=(result[0][k]);
				}

				for(var k=0;k<result[1].length;k++)
				{
					mobile[k]=web3.toAscii(result[1][k]);
				}

				console.log(mobile);
				console.log(adddr);
				
				var t = "";
				for (var i = 0; i < mobile.length; i++){
      				
      				var tr = "<tr>";
      				tr += "<td>"+adddr[i]+"</td>";
      				tr += "<td>"+mobile[i]+"</td>";
      				tr += "</tr>";
      				t += tr;
				}
				document.getElementById("logdata").innerHTML += t;
				document.getElementById('add').innerHTML = account;
			
			}).catch(function(err){
				
				console.log(err.message);
			});

		});
	}
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});