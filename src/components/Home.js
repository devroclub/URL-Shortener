import React from 'react';
import UrlController from "../controllers/UrlController";
import StatsController from "../controllers/StatsController";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            copy: null,
            buttonText: "Shorten",
            error: null,
            clicks: null
        };

        StatsController.mostClicked().then((response) => {
            this.setState({clicks: response.data});
        });
    }

    render() {
        return (
            <div className="Home container">
                <h1 className="topic">Extremely powerful URL Shortener with open stats.</h1>

                <div className="col-sm-12 col-md-8 offset-md-2">
                    <div id="url">
                        <div id="url-input">
                            <input type="url" name="url" value={this.state.url} onChange={(e) => {
                                this.inputValueChange(e.target.value)
                            }} placeholder="Paste a long URL" required/>
                            <p className="error">{this.state.error}</p>
                        </div>
                        <button id={this.state.copy} onClick={() => {
                            this.shrink()
                        }} className="buttonmain">{this.state.buttonText}</button>
                        {this.state.copy &&
                        <button onClick={() => {
                            this.reset()
                        }} className="buttonmain">Reset</button>
                        }
                    </div>
                </div>

                <h2>• Mostly clicked shorted links</h2>
                <div className="col-sm-12 col-md-8 offset-md-2">
                    <table className="table table-borderless">
                        <thead>
                        <tr>
                            <th scope="col">Links</th>
                            <th scope="col">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.clicks && this.state.clicks.map((c, i) => {
                                if (i < 10) {
                                    return (<tr key={i}>
                                        <td><a className="link" href={"https://devro.club/" + c.hash}>https://devro.club/{c.hash}</a></td>
                                        <td>{c.count}</td>
                                    </tr>);
                                }
                            }
                        )}
                        </tbody>
                    </table>
                    <a className="stat" href="/stats">View more statistics →</a>
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

            this.setState({buttonText: "Copied!"});
            setTimeout(
                function () {
                    this.setState({buttonText: "Copy to Clipboard"});
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
        let pattern = new RegExp('^(ftp|http|https):\/\/[^ "]+$');
        return !!pattern.test(str);
    }
}