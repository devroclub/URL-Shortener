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
                <div className="col-sm-12 col-md-10 offset-md-1">
                    <table className="table table-borderless text-left table-responsive">
                        <thead>
                        <tr>
                            <th scope="col">Source</th>
                            <th scope="col">Links</th>
                            <th scope="col">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.clicks && this.state.clicks.map((c, i) => {
                                if (i < 10) {
                                    return (<tr key={i}>
                                        <td className="source">{c.url}</td>
                                        <td>
                                            <a target="_blank" className="link" href={"https://devro.club/" + c.hash}>https://devro.club/{c.hash}</a>
                                            &nbsp;&nbsp;
                                            <svg onClick={() => {Home.copyURL(c.hash)}} width="14px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy"
                                                 className="svg-inline--fa fa-copy fa-w-14" role="img"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path fill="currentColor"
                                                      d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path>
                                            </svg>
                                        </td>
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

    static copyURL = (url) => {
        let input = document.createElement('input');
        input.setAttribute('value', "https://devro.club/" + url);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };

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