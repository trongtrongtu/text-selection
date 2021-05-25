import React, { Component } from "react";
import $ from 'jquery';
import "./styles.css";
import 'antd/dist/antd.css';

let that = null
let _this = null
let inputValue = null
let checkTooltip = false
let idTooltip = null
let classTooltip = null

class Highlighter extends Component {
  state = {
    description: '',
    textSelect: '',
    range: null,
    key: Math.random(),
    textTranslate: ''
  }

  componentDidMount() {
    let _this = this;
    let inputValue = ''
    let checkTooltip = false
    $("#longtext").click(function (e) {
      let that = this;
      setTimeout(function () {
        let dblclick = parseInt($(that).data('double'), 10);
        if (dblclick > 0) {
          $(that).data('double', dblclick - 1);
        } else {
          inputValue = ''
          let selection = window.getSelection().toString();
          if (selection && selection !== ' ') {
            $('#selTxt').val('');
            let x = e.pageX;
            let y = e.pageY;
            placeTooltip(x, y);
            $("#tooltip").show();
            checkTooltip = true
            let range = window.getSelection().getRangeAt(0);
            _this.setState({
              textSelect: selection.toString(),
              range,
            })
            $('#selTxt').on('input', function (e) {
              inputValue = e.currentTarget.value
            });
            $(document).on('click', function (e) {
              if ($(e.target).closest("#tooltip").length === 0) {
                $("#tooltip").hide();
                if (inputValue && checkTooltip) {
                  checkTooltip = false
                  let selectionContents = _this.state.range.extractContents();
                  let div = document.createElement("span");
                  div.id = `name_tooltip_${Math.random()}`
                  div.className = 'custom-class'
                  div.title = inputValue
                  div.appendChild(selectionContents);
                  _this.state.range.insertNode(div);
                  _this.setState({
                    key: Math.random()
                  })
                }
              }
            });
          }
        }
      }, 300);
    }).dblclick(function (e) {
      $(this).data('double', 2);
      let selection = window.getSelection().toString();
      if (selection && selection !== ' ') {
        _this.getTranslate(selection.toString()).then((value) => {
          _this.setState({
            textTranslate: `${value}`
          })
          $("#popup").show();
        })
        $('#selTxt').val('');
        let x = e.pageX;
        let y = e.pageY;
        placePopup(x, y);
        _this.setState({
          textSelect: selection.toString(),
        })
        $(document).on('click', function (e) {
          if ($(e.target).closest("#popup").length === 0) {
            _this.setState({
              key: Math.random()
            })
            $("#popup").hide();
          }
        });
      }
    });
    function placeTooltip(x_pos, y_pos) {
      $("#tooltip").css({
        top: y_pos - 75 + 'px',
        left: x_pos - 150 + 'px',
        position: 'absolute'
      });
    }
    function placePopup(x_pos, y_pos) {
      $("#popup").css({
        top: y_pos + 'px',
        left: x_pos + 'px',
        position: 'absolute'
      });
    }
  }

  componentDidUpdate() {
    that = this
    $(".custom-class").hover(
      function (e) {
        inputValue = e.currentTarget.title
        idTooltip = `#${e.currentTarget.id}`
        classTooltip = $(e.target).attr('class')
        _this = this;
        let e_hover = e
        $('#selTxtHover').val(e.currentTarget.title);
        let x = e.pageX;
        let y = e.pageY;
        placeTooltip(x, y);
        $("#tooltipHover").show();
        $('#selTxtHover').on('input', function (e) {
          checkTooltip = true
          inputValue = e.currentTarget.value
        });
        $("#addBtnHover").click(function () {
          checkTooltip = true
          if (classTooltip === 'custom-class') {
            $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class custom-class-replace" title=${inputValue}>${$(_this).text()}</span>`);
          } else {
            $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class" title=${inputValue}>${$(_this).text()}</span>`);
          }
        });
        $(document).on('click', function (e) {
          if ($(e.target).closest("#tooltipHover").length === 0) {
            $("#tooltipHover").hide();
            if (inputValue && checkTooltip && inputValue !== e_hover.currentTarget.title) {
              checkTooltip = false
              $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class" title=${inputValue}>${$(_this).text()}</span>`);
            } else if (!inputValue && checkTooltip) {
              checkTooltip = false
              $(_this).replaceWith($(_this).text());
            }
          }
        });
      }, function () {
        $(".custom-class").finish()
      }
    );
    function placeTooltip(x_pos, y_pos) {
      $("#tooltipHover").css({
        top: y_pos - 80 + 'px',
        left: x_pos - 120 + 'px',
        position: 'absolute'
      });
    }
  }

  getTranslate = async (params) => {
    try {
      let response = await fetch(`https://e-course.appspot.com/utils?type=translate&word=${params}`);
      let responseJson = await response.text();
      return responseJson;
    } catch (error) {
      console.error(`Error is : ${error}`);
    }
  }

  render() {
    const { description, textSelect, range, key, textTranslate } = this.state
    const { text } = this.props

    return (
      <>
        <ul id="names">
        </ul>
        <div id="tooltip" className="widget_not_handler hight-light-parent-panel">
          <div className="widget_not_handler hight-light-content-panel">
            <button type="button" id='addBtn' className="widget_not_handler btn-note-markup-quote"><i className="fas fa-pencil-alt"></i> </button>
            <textarea id='selTxt' name="textSelect" className="widget_not_handler area-markup-quote" placeholder="Ghi chú..."></textarea>
          </div>
        </div>
        <div id="tooltipHover" className="widget_not_handler hight-light-parent-panel">
          <div className="widget_not_handler hight-light-content-panel">
            <button onClick={() => this.setState({ key: Math.random() })} type="button" id='addBtnHover' className="widget_not_handler btn-note-markup-quote" > <i className="fas fa-pencil-alt"></i> </button>
            <textarea onChange={() => this.setState({ key: Math.random() })} id='selTxtHover' name="textSelect" className="widget_not_handler area-markup-quote" placeholder="Ghi chú..."></textarea>
          </div>
        </div>
        <div id="popup" className="dictWordPanel">
          <div className="popupHeader">
            <span style={{ fontWeight: 'bold' }}>{textSelect}</span>
            <span style={{ position: 'absolute', top: 0, right: 5, cursor: 'pointer' }} onClick={() => document.getElementById('popup').style.display = "none"}><i className="far fa-times-circle"></i></span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: textTranslate }}></div>
        </div>
        <div id='longtext' style={{ margin: '100px' }} dangerouslySetInnerHTML={{ __html: text }}></div>
      </>
    );
  }
}

export default Highlighter;