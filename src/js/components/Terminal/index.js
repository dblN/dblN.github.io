import React from 'react';

import Header from './Header';
import History from './History';
import Input from './Input';

export default class Terminal extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',
			commandHistory: []
		}
		this.user = `guest@${location.host}:~$`;
		this.historyIndex = 0;
	}
	setValue(value) {
		this.setState({value});
	}
	showHelp() {
		this.setState({
			value: 'help'
		});
	}

	// handlers
	handleClick(e) {
		if (e.target.className == 'terminal') {
			this.refs.Input.focusInput();
		}
	}
	handleKeyDown(e) {
		this.refs.Input.focusInput();
	}
	handleCommand(value) {
		let cmd = value;
		if (cmd.indexOf(' ') !== -1) {
			cmd = cmd.substr(0, cmd.indexOf(' '));
		}
		switch (cmd) {
			case 'clear':
				this.historyIndex = 0;
				this.clearHistory();
				break;
			case 'git'
				window.location.href = 'https://github.com/getmicah';
				break;
			default:
				this.appendHistory(value);
		}
	}

	// history
	lastHistory() {
		let commandCount = this.state.commandHistory.length;
		if (commandCount > 0 && this.historyIndex < commandCount) {
			let i = commandCount-this.historyIndex-1;
			this.setState({
				value: this.state.commandHistory[i]
			});
			this.historyIndex++;
		}
	}
	nextHistory() {
		let commandCount = this.state.commandHistory.length;
		if (commandCount > 0 && this.historyIndex-1 > 0) {
			let i = commandCount-this.historyIndex+1;
			this.setState({
				value: this.state.commandHistory[i]
			});
			this.historyIndex--;
		} else if (this.historyIndex == 1) {
			this.setValue('');
			this.historyIndex--;
		}
	}
	appendHistory(value) {
		let commandHistory = this.state.commandHistory.slice();
		commandHistory.push(value);
		this.setState({
			value: '',
			commandHistory: commandHistory,
			commandCount: this.state.commandCount + 1
		});
	}
	clearHistory() {
		this.setState({
			value: '',
			commandHistory: []
		});
	}

	// route paths
	componentWillMount() {
		switch (this.props.path) {
			case '/about':
				this.appendHistory('about');
				break;
			case '/contact':
				this.appendHistory('contact');
				break;
		}
	}
	render() {
		return (
			<div
				className="terminal"
				tabIndex="1"
				onClick={this.handleClick.bind(this)}
				onKeyDown={this.handleKeyDown.bind(this)} >
				<Header />
				<History
					user={this.user}
					commandHistory={this.state.commandHistory}
					showHelp={this.showHelp.bind(this)} />
				<Input
					ref="Input"
					user={this.user}
					value={this.state.value}
					handleCommand={this.handleCommand.bind(this)}
					commandHistory={this.state.commandHistory}
					lastHistory={this.lastHistory.bind(this)}
					nextHistory={this.nextHistory.bind(this)}
					setValue={this.setValue.bind(this)} />
			</div>
		);
	}
}
