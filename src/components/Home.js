import React from 'react';
import UrlController from "../controllers/UrlController";

export default class Home extends React.Component {
    state = {
        url: '',
        copy: null,
        buttonText: "Shorten",
        error: null
    };

    render() {
        return (
            <div className="Home container">
                <h1 className="topic">Extremely powerful URL Shortener with open stats.</h1>

                <div className="col-sm-12 col-md-8 offset-md-2">
                    <div id="url">
                        <div id="url-input">
                            <input type="url" name="url" value={this.state.url} onChange={(e) => {this.inputValueChange(e.target.value)}} placeholder="Paste a long URL" required/>
                            <p className="error">{this.state.error}</p>
                        </div>
                        <button id={this.state.copy} onClick={() => {this.shrink()}} className="buttonmain">{this.state.buttonText}</button>
                        {this.state.copy &&
                            <button onClick={() => {this.reset()}} className="buttonmain">Reset</button>
                        }
                    </div>
                </div>
            </div>
        );
    }

    inputValueChange = (value) => {
        this.setState({url: value});
        this.setState({error: ''});
    };

    shrink = () => {
        if (this.state.copy) {
            let input = document.createElement('input');
            input.setAttribute('value', this.state.url);
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);

            this.setState({ buttonText: "Copied!"});
            setTimeout(
                function() {
                    this.setState({ buttonText: "Copy to Clipboard"});
                }.bind(this),
                1000
            );
        } else {
            if (this.state.url === '') {
                this.setState({error: "URL field is required."});
            } else if (!this.validURL(this.state.url)) {
                this.setState({error: "URL entered is invalid."});
            } else {
                UrlController.shortener(this.state.url).then((response) => {
                    this.setState({url: response.data});
                    this.setState({copy: "copy"});
                    this.setState({buttonText: "Copy to Clipboard"});
                });
            }
        }
    };

    reset = () => {
        this.setState({copy: null});
        this.setState({url: ''});
        this.setState({buttonText: "Shorten"});
    };

    validURL = (str) => {
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
}