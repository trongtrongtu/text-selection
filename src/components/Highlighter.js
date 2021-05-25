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
    description: 'It wasn’t just the rules that had changed. The statistical revolution that swept into Major League Baseball shortly after the turn of the twenty-first century had arrived, with a few years’ delay, in the N.B.A., bringing a greater emphasis on three-point shooting from the corners and on finding openings near the basket, for high-percentage attempts. As a result, teams were reshuffling their depth charts in favor of mobility over size. “Small ball,” Bryant (and others) called it. The kind of versatile player, like Bryant, who could shoot well from anywhere on the court was no longer so highly prized, because twenty-foot jumpers were a low-percentage gamble, by definition. “I’ve always been more interested in the creative side of the game, like how things happen, why things happen, as opposed to just the numbers,” Bryant told me. “Numbers have never felt fun to me.<span class="custom-class"></span>”',
    textSelect: '',
    range: null,
    key: Math.random()
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
          // console.log('click')
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
            // console.log('selectionContents: ', window.getSelection().getRangeAt(0))
            _this.setState({
              textSelect: selection.toString(),
              range,
            })
            $('#selTxt').on('input', function (e) {
              // console.log('inputValue: ', e.currentTarget.value)
              inputValue = e.currentTarget.value
            });
            $(document).on('click', function (e) {
              if ($(e.target).closest("#tooltip").length === 0) {
                $("#tooltip").hide();
                if (inputValue && checkTooltip) {
                  checkTooltip = false
                  // console.log('aaaa: ', inputValue)
                  let selectionContents = _this.state.range.extractContents();
                  let div = document.createElement("span");
                  div.id = `name_tooltip_${Math.random()}`
                  div.className = 'custom-class'
                  // div.style.background = "red";
                  // div.style.cursor = "pointer";
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
        $('#selTxt').val('');
        let x = e.pageX;
        let y = e.pageY;
        placePopup(x, y);
        $("#popup").show();
        _this.setState({
          textSelect: selection.toString(),
        })
        // let range = window.getSelection().getRangeAt(0);
        $(document).on('click', function (e) {
          if ($(e.target).closest("#popup").length === 0) {
            console.log('bbbb')
            _this.setState({
              key: Math.random()
            })
            $("#popup").hide();
          }
        });
      }
    });
    // $(document).on('click', function (e) {
    //   if ($(e.target).closest("#tooltipHover").length === 0) {
    //     _this.setState({
    //       key: Math.random()
    //     })
    //   }
    // });
    // $("#addBtn").click(function () {
    //   $("#tooltip").hide();
    // });
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
        // console.log('$( e ).length: ', $(this).text().length)
        inputValue = e.currentTarget.title
        idTooltip = `#${e.currentTarget.id}`
        classTooltip = $(e.target).attr('class')
        _this = this;
        let e_hover = e
        // $(this).addClass("hover");
        $('#selTxtHover').val(e.currentTarget.title);
        let x = e.pageX;
        let y = e.pageY;
        // that.setState({ key: Math.random() })
        placeTooltip(x, y);
        $("#tooltipHover").show();
        // console.log('componentDidUpdate: ', e)
        $('#selTxtHover').on('input', function (e) {
          // console.log('componentDidUpdateInputValue: ', e.currentTarget.value)
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
              // console.log('componentDidUpdateOut: ', inputValue, e_hover.currentTarget.title)
              // that.setState({ key: Math.random() })
              $(_this).replaceWith(`<span id=${e_hover.currentTarget.id} class="custom-class" title=${inputValue}>${$(_this).text()}</span>`);
              // let selectionContents = _this.state.range.extractContents();
              // let div = document.createElement("span");
              // div.className = 'nameTooltip'
              // div.style.background = "red";
              // div.style.cursor = "pointer";
              // div.title = inputValue
              // div.appendChild(selectionContents);
              // _this.state.range.insertNode(div);
            } else if (!inputValue && checkTooltip) {
              // console.log('_this: ', checkTooltip)
              checkTooltip = false
              $(_this).replaceWith($(_this).text());
            }
          }
        });
      }, function () {
        // $(this).removeClass("hover");
        // $("#tooltip").hide();
        $(".custom-class").finish()
      }
    );
    // $(document).on('click', function (e) {
    //   if ($(e.target).closest("#tooltipHover").length === 0) {
    //     _this.setState({
    //       key: Math.random()
    //     })
    //   }
    // });
    function placeTooltip(x_pos, y_pos) {
      $("#tooltipHover").css({
        top: y_pos - 80 + 'px',
        left: x_pos - 120 + 'px',
        position: 'absolute'
      });
    }
  }

  // onchange = (event) => {
  //   event.preventDefault();
  //   const { range } = this.state
  //   let selectionContents = range.extractContents();
  //   let div = document.createElement("span");
  //   div.className = 'name'
  //   div.style.background = "red";
  //   div.style.cursor = "pointer";
  //   div.title = event.target.textSelect.value
  //   div.appendChild(selectionContents);
  //   range.insertNode(div);
  // }

  // compare = (a, b) => {
  //   if (a.start > b.start) {
  //     return -1;
  //   }
  //   if (a.start < b.start) {
  //     return 1;
  //   }
  //   return 0;
  // }

  render() {
    const { description, textSelect, range, key } = this.state
    // console.log('range: ', document.getElementById("longtext").querySelectorAll(".name"))
    // console.log('document.getElementById("selTxt").value: ', document.getElementById("selTxt").value)
    console.log('setStateKey: ', this.state.key);
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
        <div id="popup" className="dictWordPanel" style={{ width: '30%' }}>
          <div style={{ position: 'relative' }} className="popupHeader">
            <span>{textSelect}</span>
            <span style={{ position: 'absolute', top: 0, right: 5, cursor: 'pointer' }} onClick={() => document.getElementById('popup').style.display = "none"}><i className="far fa-times-circle"></i></span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: `<figure class="table"><table style="background-color:rgb(255, 255, 255);"><tbody><tr><td style="padding:0px;width:18px;"><strong>◎</strong></td><td style="padding:0px;width:2000px;" colspan="3">[,revə'lu:∫n]</td></tr><tr><td style="padding:0px;width:18px;"><strong>※</strong></td><td style="padding:0px;width:2000px;" colspan="3"><strong>danh từ</strong></td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">sự xoay vòng; vòng quay; vòng, tua</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">revolutions per minute</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">số vòng quay mỗi phút</td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">(toán học); (thiên văn học) sự xoay vòng</td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">cuộc cách mạng (nhất là bằng vũ lực, lật đổ một chế độ cai trị)</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">the socialist revolution</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">cuộc cách mạng xã hội chủ nghĩa</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">the national democratic revolution</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">cuộc cách mạng dân tộc dân chủ</td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">cuộc cách mạng (sự thay đổi hoàn toàn về phương pháp, hoàn cảnh..)</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">a revolution in the treatment of cancer</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">một cuộc cách mạng trong cách điều trị ung thư</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">a technological revolution</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">một cuộc cách mạng trong công nghệ</td></tr></tbody></table></figure>` }}></div>
        </div>
        <div id='longtext' style={{ margin: '100px' }} dangerouslySetInnerHTML={{ __html: description }}></div>
      </>
    );
  }
}

export default Highlighter;