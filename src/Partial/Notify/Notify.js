import React, {Component} from 'react';
import "./notify.scss";


// Notify is an custom React modal based on bootstrap
class Notify extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        // the modal launcher button element
        //update when click on it in componentDidMount
        this.knob = null;

        // jQuery selector of this modal
        this.$modal = null;

        this.configContext(this.props);
    }





    configContext(props) {
        const defaultOptions = {
            size: null, // sm  || lg

            // modal theme
            //
            // @value: default || green || red ||  yellow || orange || blue || light
            theme: 'default',

            // inset title text to modal-header
            //
            // @value: null (remove modal-header) || string
            title: null,

            // insert message text in modal-body
            // use it for show big text (only text)
            //
            // @value:  null (remove modal-body) || string
            message: null,

            // custom context
            //
            // null || component children (all context between component tag)
            children: null,

            // insert close button to modal footer
            //
            // @value: null (remove close button in modal-footer) ||
            //          string (just change button label) ||
            //          function (just set custom opration) ||
            //          array [label string, opration function] change both label and opration
            close: null,

            //inset tip text to modal-footer
            // use it for show small tip text
            //
            // @value: null || string
            tip: null,

            // when define cancel, accept or both we insert to button in modal footer
            //
            // @value: null ||
            //          string (just change button label) ||
            //          function (just set custom opration) ||
            //          array [label string, opration function] change both label and opration
            accept: null,
            cancel: null,


            // null || array (list of buttons JSX)
            button: null,

            // null || number (milisecond number) || array [number(milisecond number), function (callback)]
            lifeTime: null,

            // modal classes
            className: '',


            // auto open
            autoOpen: false
        };

        // set default option
        this.op = $.extend(defaultOptions, props || {});

        // reset button
        // list of footer buttons
        this.button = [];


        // close
        //
        // define close prop
        // if close is true then close button label is default ('بستن');
        // and when define an string then button label is value of close
        if (this.op.close !== null) {
            let label = "بستن";
            if (Array.isArray(this.op.close))
                label = this.op.close[0];
            else if (typeof this.op.close === "string")
                label = this.op.close;

            if (!$.isFunction(this.op.close))
                this.button.push(<button key={'close'} type="button" className="btn btn-secondary" data-dismiss="modal">{label}</button>);
        }


        // accept & cancel
        //
        // if (accept !== null || cancel !== null)
        //      is confirm mod
        //
        if (this.op.accept !== null || this.op.cancel !== null) {
            let label = {
                    accept: 'تایید',
                    cancel: 'رد'
                },
                opration = {
                    accept: () => true,
                    cancel: () => true
                };

            // ---------------- accpet button ----------------//

            // when passed accpet prop
            // then build opration and label
            if (Array.isArray(this.op.accept)) {
                label.accept = this.op.accept[0];
                opration.accept = this.op.accept[1];
            } else if (typeof this.op.accept === "string") {
                label.accept = this.op.accept;
            } else if ($.isFunction(this.op.accept)) {
                opration.accept = this.op.accept;
            }

            // accept button
            const acceptButton =
                <button key={'accept'}
                        type="button"
                        onClick={(e) => opration.accept(this, e)}
                        data-dismiss="modal"
                        className="btn btn-secondary">
                    {label.accept}
                </button>

            //add to modal-footer
            this.button.push(acceptButton);

            // ---------------- cancel  button ----------------//

            // when passed accpet prop
            // then build opration and label
            if (typeof this.op.cancel === "string") {
                label.cancel = this.op.cancel
            } else if (Array.isArray(this.op.cancel)) {
                label.cancel = this.op.cancel[0];
                opration.cancel = this.op.cancel[1];
            } else if ($.isFunction(this.op.cancel)) {
                opration.cancel = this.op.cancel;
            }

            // cancel button
            const cancelButton =
                <button key={'cancel'}
                        type="button"
                        onClick={(e) => opration.cancel(this, e)}
                        data-dismiss="modal"
                        className="btn btn-danger">
                    {label.cancel}
                </button>

            //add to modal-footer
            this.button.push(cancelButton);
        }

        // when user pass custom button
        if (this.op.button !== null)
            this.button = [
                ...this.button,
                ...this.op.button
            ];
    }





    shouldComponentUpdate(nextProps) {
        this.configContext(nextProps);
        return true;
    }




    componentDidMount() {
        // the modal element
        this.$modal = $(`#${this.op.id}`);

        // life time
        this.$progressBar = this.$modal.find('.life-time .progress-bar');

        // modal closing listener
        this.$modal.on(`hidden.bs.modal.${this.op.id}`, () => {
            // run close opration
            if (Array.isArray(this.op.close))
                this.op.close[1](this);
            else if ($.isFunction(this.op.close))
                this.op.close(this);

            // set isOpen flag false when modal closed
            this.setState({isOpen: false});
        });


        //
        // open modal
        // when click on element with [data-notify] attribute
        //
        let self = this;
        $(document).on(`click.${this.op.id} touchstart.${this.op.id}`, `[data-notify=${this.op.id}]`, function () {
            // set modal open
            self.$modal.modal('show');
            self.setState({isOpen: true});
            self.knob = this;

            // has life time
            if (self.op.lifeTime !== null) {
                let
                    lifeTime = self.op.lifeTime,
                    callback = () => true;

                if (Array.isArray(lifeTime)) {
                    lifeTime = self.op.lifeTime[0];
                    callback = self.op.lifeTime[1];
                }

                // reset progress bar
                self.$progressBar.css("transition-duration", "0ms").width(0);

                // for wait to modal animation end (linked to .d-500ms class of .modal)
                setTimeout(() => {
                    // start progress bar animate
                    self.$progressBar.css("transition-duration", lifeTime + "ms").width('100%');

                    // a state holder for fix confilict of setTimeout and on() event
                    let applicable = true;

                    //close modal
                    const hiding = () => {
                        if (applicable) {
                            applicable = false;
                            self.$modal.modal('hide');
                            callback(self);
                            clearTimeout(timeoutKey);
                        }
                    }

                    // when life time end
                    const timeoutKey = setTimeout(hiding, lifeTime);

                    // when user closed modal
                    self.$modal.on(`hidden.bs.modal.${self.op.id}`, hiding);
                }, 500);
            }
        });


        // open modal after mount
        if (this.op.autoOpen)
            $('<div></div>').attr('data-notify', this.op.id).appendTo('body').trigger('click');

    }





    componentWillUnmount() {
        //kill modal event
        this.$modal.modal('hide');
        this.$modal.modal('dispose');
        this.$modal.off(`.${this.op.id}`);
        $(document).off(`.${this.op.id}`);
    }





    render() {
        // return a bootstrap modal
        return (
            <div className={`modal animated slideInUp  d-500ms notify theme-${this.op.theme} ${this.op.className}`}
                 id={this.op.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className={`modal-dialog modal-dialog-centered ${this.op.size !== null ? `modal-${this.op.size}` : ''} `} role="document">
                    <div className="modal-content">
                        {
                            (this.op.lifeTime) ? (
                                <div className="life-time progress">
                                    <div className="progress-bar" role="progressbar"></div>
                                </div>
                            ) : ''
                        }

                        {
                            (this.op.title !== null) ? (
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{this.op.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            ) : ''
                        }

                        {
                            (this.op.message !== null || this.op.children !== null) ? (
                                <div className="modal-body">
                                    {this.op.message}
                                    {
                                        (this.state.isOpen) ? (
                                            $.isFunction(this.op.children) ? this.op.children(this) : this.op.children
                                        ) : ''
                                    }
                                </div>
                            ) : ''
                        }

                        {
                            (this.button.length !== 0 || this.op.tip !== null) ? (
                                <div className="modal-footer">
                                    <span>{this.op.tip}</span>
                                    <div>{this.button}</div>
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}


let cmp = () => '';

if (typeof window !== 'undefined')
    cmp = Notify;



export default cmp;
