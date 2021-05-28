import React, { Component } from "react";
import $ from 'jquery';
import "./styles.css";
// import 'antd/dist/antd.css';

let that = null
let _this = null
let inputValue = null
let checkTooltip = false
let idTooltip = null
let classTooltip = null
let div = null
let checkColor = false

class Highlighter extends Component {
  state = {
    description: '',
    textSelect: '',
    range: null,
    key: Math.random(),
    textTranslate: '',
    checkPopup: false,
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
            $('#sel-txt').val('');
            let x = e.pageX;
            let y = e.pageY;
            placeTooltip(x, y);
            $("#tooltip").show();
            checkTooltip = true
            let range = window.getSelection().getRangeAt(0);
            _this.setState({
              textSelect: selection.toString(),
              range,
              checkPopup: true
            })
            $('#sel-txt').on('input', function (e) {
              inputValue = e.currentTarget.value
            });
            let selectionContents = _this.state.range.extractContents();
            div = document.createElement("span");
            div.id = `name_tooltip_${Math.random()}`
            div.className = 'custom-class'
            div.title = inputValue
            div.appendChild(selectionContents);
            _this.state.range.insertNode(div);
            _this.setState({
              key: Math.random()
            })
            $("#add-btn").click(function () {
              checkTooltip = true
              // if (classTooltip === 'custom-class') {
              checkColor = true
              $(div).replaceWith(`<span id=name_tooltip_${Math.random()} class="custom-class custom-class-replace" title=${inputValue}>${$(div).text()}</span>`);
              _this.setState({
                key: Math.random()
              })
              // } else {
              //   $(div).replaceWith(`<span id=name_tooltip_${Math.random()} class="custom-class" title=${inputValue}>${$(div).text()}</span>`);
              // }
            });
            $("#removeBtn").click(function () {
              $("#tooltip").hide();
              checkColor = false
              $(div).replaceWith($(div).text());
            });
            $(document).on('click', function (e) {
              if ($(e.target).closest("#tooltip").length === 0) {
                $("#tooltip").hide();
                if (inputValue && checkTooltip) {
                  checkTooltip = false
                  $(div).replaceWith(`<span id=name_tooltip_${Math.random()} class="${!checkColor ? 'custom-class' : 'custom-class custom-class-replace'}" title=${inputValue}>${$(div).text()}</span>`);
                  checkColor = false
                  _this.setState({
                    key: Math.random(),
                    checkPopup: false
                  })
                } else if (!inputValue && checkTooltip) {
                  checkTooltip = false
                  checkColor = false
                  $(div).replaceWith($(div).text());
                  _this.setState({
                    key: Math.random(),
                    checkPopup: false
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
        $('#sel-txt').val('');
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
        top: y_pos - 73 + 'px',
        left: x_pos - 170 + 'px',
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
    const { checkPopup } = this.state
    that = this
    if (!checkPopup) {
      $(".custom-class").hover(
        function (e) {
          inputValue = e.currentTarget.title
          idTooltip = `#${e.currentTarget.id}`
          classTooltip = $(e.target).attr('class')
          _this = this;
          let e_hover = e
          $('#sel-txt-hover').val(e.currentTarget.title);
          let x = e.pageX;
          let y = e.pageY;
          placeTooltip(x, y);
          $("#tooltip-hover").show();
          $('#sel-txt-hover').on('input', function (e) {
            checkTooltip = true
            inputValue = e.currentTarget.value
          });
          $("#add-btn-hover").click(function () {
            checkTooltip = true
            if (classTooltip === 'custom-class') {
              $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class custom-class-replace" title=${inputValue}>${$(_this).text()}</span>`);
            } else {
              $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class" title=${inputValue}>${$(_this).text()}</span>`);
            }
          });
          $("#remove-btn-hover").click(function () {
            $("#tooltip-hover").hide();
            $(_this).replaceWith($(_this).text());
          });
          $(document).on('click', function (e) {
            if ($(e.target).closest("#tooltip-hover").length === 0) {
              $("#tooltip-hover").hide();
              if (inputValue && checkTooltip && inputValue !== e_hover.currentTarget.title) {
                checkTooltip = false
                if (classTooltip === 'custom-class') {
                  $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class" title=${inputValue}>${$(_this).text()}</span>`);
                } else {
                  $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class custom-class-replace" title=${inputValue}>${$(_this).text()}</span>`);
                }
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
        $("#tooltip-hover").css({
          top: y_pos - 75 + 'px',
          left: x_pos - 140 + 'px',
          position: 'absolute'
        });
      }
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
            <div className="widget_not_handler-button">
              <button onClick={() => this.setState({ key: Math.random() })} type="button" id='add-btn' className="widget_not_handler btn-note-markup-quote"><i className="fas fa-pencil-alt" style={{ fontSize: '18px' }}></i> </button>
              <button type="button" id='removeBtn' className="widget_not_handler btn-note-markup-quote"><i className="far fa-trash-alt" style={{ fontSize: '18px' }}></i> </button>
            </div>
            <textarea id='sel-txt' name="text-select" className="widget_not_handler area-markup-quote" placeholder="Ghi chú..."></textarea>
          </div>
        </div>
        <div id="tooltip-hover" className="widget_not_handler hight-light-parent-panel">
          <div className="widget_not_handler hight-light-content-panel">
            <div className="widget_not_handler-button">
              <button onClick={() => this.setState({ key: Math.random() })} type="button" id='add-btn-hover' className="widget_not_handler btn-note-markup-quote" > <i className="fas fa-pencil-alt" style={{ fontSize: '18px' }}></i> </button>
              <button type="button" id='remove-btn-hover' className="widget_not_handler btn-note-markup-quote"><i className="far fa-trash-alt" style={{ fontSize: '18px' }}></i> </button>
            </div>
            <textarea onChange={() => this.setState({ key: Math.random() })} id='sel-txt-hover' name="text-select" className="widget_not_handler area-markup-quote" placeholder="Ghi chú..."></textarea>
          </div>
        </div>
        <div id="popup" className="dict-word-panel">
          <div className="popupHeader">
            <span style={{ fontWeight: 'bold' }}>{textSelect}</span>
            <span style={{ position: 'absolute', top: 6, right: 8, cursor: 'pointer' }} onClick={() => document.getElementById('popup').style.display = "none"}><i className="far fa-times-circle"></i></span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: textTranslate }}></div>
        </div>
        <div id='longtext' dangerouslySetInnerHTML={{ __html: text }}></div>
      </>
    );
  }
}

export default Highlighter;