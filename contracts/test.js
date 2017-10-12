var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://60.249.15.85:8546"));

var abi = [{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"voterName","type":"string"}],"name":"addCandidate","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getVoter","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getCandidateCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"name","type":"string"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getCandidate","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"voted","type":"bool"},{"name":"candidate","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidateName","type":"string"}],"name":"vote","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"Vote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"}],"name":"AddCandidate","type":"event"}]

var address = "0xe35d00341a2af643f5a6fce9a36c3b2f5200b3b4";

const test = web3.eth.contract(abi).at(address);
var account = web3.eth.accounts[1];

// addCandidate(account, '測試');
getCandidateCount();
// sendBalance('0x5f986b2d8553e7216741061ade1d6de153294a02', '0x895b5e562fc50373cb9214437316826bc3423f7b', 999999999999999999999999);
// getVoter();
// vote(account, '測試');
// getBalance();

/***
 投票
 */
function vote (account, candidateName) {
	if (getVoter().voted == false) {
		var txHash = test.vote.sendTransaction(candidateName, {from: account});
		var addVoteEvent = test.Vote();
		addVoteEvent.watch(function(err, result) {
			if (!err && result.transactionHash == txHash) {
				console.log(true);
			} else {
				console.log(err);
			}
			addVoteEvent.stopWatching();
		})
	} else {
		console.log('This account is already voted.')
	}
}

/***
 取得帳戶投票狀況
 */
function getVoter () {
	var result = {
		'voted': test.getVoter.call({from: account})[0],
		'candidate': test.getVoter.call({from: account})[1]
	}
	console.log(result);
	return result;
}

/***
 添加投票候選人
 */
function addCandidate (account, name) {
	var candidateCount = test.getCandidateCount.call().toNumber()
	for (var i = 0; i < candidateCount; i++) {
		if(test.getCandidate.call(i)[0] == name) {
			console.log('This name is already exist.');
			return;
		}
	}
	var txHash = test.addCandidate.sendTransaction(candidateCount, name, {from: account});
	var addCandidateEvent = test.AddCandidate();
	addCandidateEvent.watch(function(err, result) {
		if (!err && result.transactionHash == txHash) {
			console.log({
				'name': test.getCandidate.call(candidateCount)[0],
				'count': test.getCandidate.call(candidateCount)[1].toNumber()
			});
		} else {
			console.log(err);
		}
		addCandidateEvent.stopWatching();
	});
}

/***
 候選人列表
 */
function getCandidateCount () {
	for (var i = 0; i < test.getCandidateCount.call().toNumber(); i++) {
		var candidate = test.getCandidate.call(i)
		console.log({
			'name': candidate[0],
			'count': candidate[1].toNumber()
		});
	}
}

/***
 取得帳號的餘額
 */
function getBalance () {
	for (var index = 0; index < web3.eth.accounts.length; index++) {
		console.log({
			'account': web3.eth.accounts[index],
			'balance': web3.eth.getBalance(web3.eth.accounts[index]).toNumber()
		});
	}
}

/***
 發送乙太幣
 */
function sendBalance (from, to, value) {
	var data = {
		'from': from,
		'to': to,
		'value': value
	};
	web3.eth.sendTransaction(data, function(err, transactionHash) {
		if (!err) console.log(transactionHash);
	});
}