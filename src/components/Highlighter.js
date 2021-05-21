import React, { Component } from "react";
import { Modal } from 'antd';
import SelectionHighlighter from "react-highlight-selection";
import TextSelector from 'text-selection-react';
import { InteractiveHighlighter } from 'react-interactive-highlighter';
import $ from 'jquery';
import "./styles.css";
import 'antd/dist/antd.css';

class Highlighter extends Component {
  state = {
    isModalVisible: false,
    textHighlight: '',
    dataArr: [],
    description: 'Let there be light, let there be Sun.',
    text: "I saw the best minds of my generation destroyed by madness, starving hysterical naked, dragging themselves...",
    highlights: [],
    position1: null,
    position2: null,
    textSelect: ''
  }

  componentDidMount() {
    const { position1, position2, textSelect } = this.state
    let _this = this;
    $("#addBtn").click(function () {
      console.log(position1, position2, textSelect)
      // $("#names")
      //   .append($('<li>').append(
      //     $('#selTxt').val()
      //   ));
      $("#tooltip").hide();
    });
    function placeTooltip(x_pos, y_pos) {
      $("#tooltip").css({
        top: y_pos + 'px',
        left: x_pos + 'px',
        position: 'absolute'
      });
    }
    $('#longtext').mouseup(function (e) {
      // get selected text
      // http://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
      var selection = window.getSelection().toString();
      if (selection) {
        $('#selTxt').val(selection.toString());
        var x = e.pageX;
        var y = e.pageY;
        placeTooltip(x, y);
        $("#tooltip").show();
        console.log('selection: ', window.getSelection().anchorOffset, window.getSelection().extentOffset)
        _this.setState({
          position1: window.getSelection().anchorOffset,
          position2: window.getSelection().extentOffset,
          textSelect: selection.toString()
        })
      }
    });
  }

  selectionHandler = (selection) => {
    //do something with selection
    console.log(selection);
    if (selection?.selection) {
      this.showModal(selection?.selection);
    }
  }

  showModal = (value) => {
    const { dataArr } = this.state
    this.setState({
      isModalVisible: true,
      textHighlight: value,
      // dataArr: [...dataArr, value]
    })
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  };

  handler = (html, text) => {
    console.log('text: ', text)
    console.log('html: ', html)
  };

  selectionHandler = (selected, startIndex, numChars) => {
    this.showModal(selected)
    this.setState({
      text: this.state.text,
      highights: this.state.highlights.push({
        startIndex: startIndex,
        numChars: numChars,
        note: 'aaaaa'
      })
    })
  }

  onchange = (value) => {
    const { position1, position2, textSelect, description } = this.state
    const data1 = `<span class="tooltip" style="background: red;">${textSelect}<span class="tooltiptext">Tooltip text</span></span>`
    const data2 = description.slice(0,position1)
    const data3 = description.slice(position2,description.length)
    console.log('data3: ', value.target)
    this.setState({
      description: data2.concat(data1,data3)
    })
  }

  render() {

    const { isModalVisible, textHighlight, dataArr, description, highlights,position1, position2, textSelect } = this.state
    const { text } = this.props
    console.log(position1, position2, textSelect)
    return (
      <>
        {/* <SelectionHighlighter
          text={text}
          selectionHandler={this.selectionHandler}
          customClass="custom-class"
        />
        <div dangerouslySetInnerHTML={{ __html: description }} /> */}
        {/* <TextSelector
        events={[
        {
            text: 'Submit',
            handler: this.handler
        }
        ]}
        color={'yellow'}
        colorText={true}
    /> */}
        {/* <InteractiveHighlighter
          text={this.state.text}
          highlights={this.state.highlights}
          customClass='highlighted'
          selectionHandler={this.selectionHandler}
        />
        <h1 style={{ marginTop: '300px' }}>Here In events you can add as many event as you want. like currently i am using only one event then it will be shown as</h1> */}
        <ul id="names">

        </ul>
        <div id="tooltip">Selected text:
  <input id='selTxt' type="text"></input>
          <button type="button" id='addBtn' name='a' onClick={this.onchange}>Add</button>
        </div>
        <div id='longtext' dangerouslySetInnerHTML={{ __html: description }}></div>
        <Modal visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div>{textHighlight}</div>
        </Modal>
      </>
    );
  }
}

export default Highlighter;