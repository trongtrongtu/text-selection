import React, { Component } from "react";
import $ from 'jquery';
import "./styles.css";

let that = null
let _thisHover = null
let inputValue = null
let checkTooltip = false
let idTooltip = null
let classTooltip = null
let div = null
let checkColor = false
let checkColorHover = false
let checkHover = false
let timer = null;
let checkTimeOut = false
let checkPopup = false

class Highlighter extends Component {
  state = {
    description: '',
    textSelect: '',
    range: null,
    key: Math.random(),
    textTranslate: '',
  }

  componentDidMount() {
    let _this = this;
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
            checkPopup = true
            let range = window.getSelection().getRangeAt(0);
            _this.setState({
              textSelect: selection.toString(),
              range,
            })
            let selectionContents = _this.state.range.extractContents();
            div = document.createElement("span");
            div.className = 'custom-class'
            div.id = inputValue
            div.appendChild(selectionContents);
            _this.state.range.insertNode(div);
            _this.setState({
              key: Math.random()
            })
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
      }
    });

    $('#sel-txt').on('input', function (e) {
      inputValue = e.currentTarget.value
    });

    $("#add-btn").click(function () {
      checkTooltip = true
      if (!checkColor) {
        div.className = 'custom-class-replace'
        checkColor = true
      } else {
        div.className = 'custom-class'
        checkColor = false
      }
      div.id = inputValue
      _this.setState({
        key: Math.random()
      })
    });

    $("#remove-btn").click(function () {
      $("#tooltip").hide();
      checkColor = false
      $(div).replaceWith(div.innerHTML);
      _this.setState({
        key: Math.random(),
      })
    });

    $(document).on('click', function (e) {
      if ($(e.target).closest("#tooltip").length === 0) {
        $("#tooltip").hide();
        if (inputValue && checkTooltip) {
          checkTooltip = false
          checkHover = false
          div.id = inputValue
          checkColor = false
          checkPopup = false
          _this.setState({
            key: Math.random(),
          })
        } else if (!inputValue && checkTooltip) {
          if (!checkColor) {
            $(div).replaceWith(div.innerHTML);
          }
          checkTooltip = false
          checkHover = false
          checkColor = false
          checkPopup = false
          _this.setState({
            key: Math.random(),
          })
        }
      }
    });

    $(document).on('click', function (e) {
      if ($(e.target).closest("#popup").length === 0) {
        _this.setState({
          key: Math.random()
        })
        $("#popup").hide();
      }
    });

    $('#sel-txt-hover').on('input', function (e) {
      checkTooltip = true
      inputValue = e.currentTarget.value
    });

    $("#add-btn-hover").click(function () {
      checkTooltip = true
      if (classTooltip === 'custom-class') {
        _thisHover.className = 'custom-class-replace'
      } else {
        _thisHover.className = 'custom-class'
      }
      _thisHover.id = inputValue
    });

    $("#remove-btn-hover").click(function () {
      $("#tooltip-hover").hide();
      checkHover = false
      checkColorHover = false
      $(_thisHover).replaceWith(_thisHover.innerHTML);
    });

    $("#tooltip-hover").hover(
      function (e) {
        clearTimeout(timer);
        checkTimeOut = false
      }, function (e) {
        if (!checkTimeOut) {
          $('#tooltip-hover').hide();
          if (inputValue && checkTooltip && inputValue !== e.currentTarget.id) {
            checkTooltip = false
            _thisHover.id = inputValue
            checkColorHover = false
          } else if (!inputValue && checkTooltip) {
            $(_thisHover).replaceWith(_thisHover.innerHTML);
            checkColorHover = false
            checkTooltip = false
          }
          checkTimeOut = true
        }
      }
    )

    function placeTooltip(x_pos, y_pos) {
      $("#tooltip").css({
        top: y_pos - 77 + 'px',
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
    that = this
    $(".custom-class, .custom-class-replace").hover(
      function (e) {
        if (!checkPopup) {
          inputValue = e.currentTarget.id
          idTooltip = `#${e.currentTarget.id}`
          classTooltip = $(e.target).attr('class')
          _thisHover = this;
          let e_hover = e
          $('#sel-txt-hover').val(e.currentTarget.id);
          let x = e.pageX;
          let y = e.pageY;
          placeTooltip(x, y);
          $("#tooltip-hover").show();
          checkHover = true
          clearTimeout(timer);
          checkTimeOut = false
        }
      }, function () {
        if (!checkTimeOut) {
          timer = setTimeout(function () {
            $('#tooltip-hover').hide();
          }, 300);
          checkTimeOut = true
        }
      }
    );
    function placeTooltip(x_pos, y_pos) {
      $("#tooltip-hover").css({
        top: y_pos - 78 + 'px',
        left: x_pos - 140 + 'px',
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
            <div className="hight-light-content-panel-icon"><i class="fas fa-sort-down"></i></div>
            <div className="widget_not_handler-button">
              <button onClick={() => this.setState({ key: Math.random() })} type="button" id='add-btn' className="widget_not_handler btn-note-markup-quote"><i className="fas fa-pencil-alt" style={{ fontSize: '18px' }}></i> </button>
              <button type="button" id='remove-btn' className="widget_not_handler btn-note-markup-quote"><i className="far fa-trash-alt" style={{ fontSize: '18px' }}></i> </button>
            </div>
            <textarea id='sel-txt' name="text-select" className="widget_not_handler area-markup-quote" placeholder="Ghi chú..."></textarea>
          </div>
        </div>
        <div id="tooltip-hover" className="widget_not_handler hight-light-parent-panel">
          <div className="widget_not_handler hight-light-content-panel">
            <div className="hight-light-content-panel-icon"><i class="fas fa-sort-down"></i></div>
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