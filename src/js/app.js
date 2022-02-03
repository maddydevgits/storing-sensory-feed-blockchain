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
			return App.bindEvents();
	},

	bindEvents: function() {

		$(document).on('click', '.btn-register', App.registerUser);
	},

	registerUser: function(event) {
		event.preventDefault();

		var registerInstance;
		var mobile = document.getElementById('mobile').value;
		
		console.log(mobile);

		web3.eth.getAccounts(function(error,accounts){

			if(error) {
				console.log(error);
			}

			var account=accounts[0];
			console.log(account);

			App.contracts.register.deployed().then(function(instance){
				
				registerInstance=instance;
				return registerInstance.addDevice(web3.fromAscii(mobile),{from:account});

			}).then(function(result){

				console.log(result);
				window.location.reload(); 
				document.getElementById('mobile').innerHTML = '';
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