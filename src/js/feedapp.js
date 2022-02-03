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
				return registerInstance.viewFeed.call();

			}).then(function(result){
                console.log(result);
                var hum=[];
				var temp=[];

				for(var k=0;k<result[0].length;k++)
				{
					hum[k]=web3.toAscii(result[0][k]);
				}

				for(var k=0;k<result[1].length;k++)
				{
					temp[k]=web3.toAscii(result[1][k]);
				}
                console.log(hum);
				console.log(temp);
				
				var t = "";
				for (var i = 0; i < hum.length; i++){
      				
      				var tr = "<tr>";
      				tr += "<td>"+hum[i]+"</td>";
      				tr += "<td>"+temp[i]+"</td>";
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