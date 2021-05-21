import React, { Component } from "react";
import $ from 'jquery';
import "./styles.css";
import 'antd/dist/antd.css';

class Highlighter extends Component {
  state = {
    description: 'It wasn’t just the rules that had changed. The statistical revolution that swept into Major League Baseball shortly after the turn of the twenty-first century had arrived, with a few years’ delay, in the N.B.A., bringing a greater emphasis on three-point shooting from the corners and on finding openings near the basket, for high-percentage attempts. As a result, teams were reshuffling their depth charts in favor of mobility over size. “Small ball,” Bryant (and others) called it. The kind of versatile player, like Bryant, who could shoot well from anywhere on the court was no longer so highly prized, because twenty-foot jumpers were a low-percentage gamble, by definition. “I’ve always been more interested in the creative side of the game, like how things happen, why things happen, as opposed to just the numbers,” Bryant told me. “Numbers have never felt fun to me.”',
    textSelect: '',
  }

  componentDidMount() {
    let _this = this;
    $("#longtext").click(function (e) {
      var that = this;
      setTimeout(function () {
        var dblclick = parseInt($(that).data('double'), 10);
        if (dblclick > 0) {
          $(that).data('double', dblclick - 1);
        } else {
          var selection = window.getSelection().toString();
          if (selection && selection !== ' ') {
            $('#selTxt').val('');
            var x = e.pageX;
            var y = e.pageY;
            placeTooltip(x, y);
            $("#tooltip").show();
            var range = window.getSelection().getRangeAt(0);
            _this.setState({
              textSelect: selection.toString(),
              range,
            })
            $(document).on('click', function (e) {
              if ($(e.target).closest("#tooltip").length === 0) {
                $("#tooltip").hide();
              }
            });
          }
        }
      }, 300);
    }).dblclick(function (e) {
      $(this).data('double', 2);
      var selection = window.getSelection().toString();
      if (selection && selection !== ' ') {
        $('#selTxt').val('');
        var x = e.pageX;
        var y = e.pageY;
        placePopup(x, y);
        $("#popup").show();
        var range = window.getSelection().getRangeAt(0);
        _this.setState({
          textSelect: selection.toString(),
          range,
        })
        $(document).on('click', function (e) {
          if ($(e.target).closest("#popup").length === 0) {
            $("#popup").hide();
          }
        });
      }
    });
    $("#addBtn").click(function () {
      $("#tooltip").hide();
    });
    function placeTooltip(x_pos, y_pos) {
      $("#tooltip").css({
        top: y_pos + 'px',
        left: x_pos + 'px',
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

  onchange = (event) => {
    event.preventDefault();
    const { range } = this.state
    var selectionContents = range.extractContents();
    var div = document.createElement("span");
    div.style.background = "red";
    div.style.cursor = "pointer";
    div.title = event.target.textSelect.value
    div.appendChild(selectionContents);
    range.insertNode(div);
  }

  compare = (a, b) => {
    if (a.start > b.start) {
      return -1;
    }
    if (a.start < b.start) {
      return 1;
    }
    return 0;
  }

  render() {

    const { description, textSelect } = this.state
    return (
      <>
        <ul id="names">
        </ul>
        <div id="tooltip">
          <div style={{ position: 'relative' }}>
            <span>{textSelect}</span>
            <span style={{ position: 'absolute', top: 0, right: 5, cursor: 'pointer' }} onClick={() => document.getElementById('tooltip').style.display = "none"}>x</span>
          </div>
          <form onSubmit={this.onchange}>
            <input id='selTxt' type="text" name="textSelect"></input>
            <button type="submit" id='addBtn'>Add</button>
          </form>
        </div>
        <div id="popup" style={{ width: '30%' }}>
          <div style={{ position: 'relative' }}>
            <span>{textSelect}</span>
            <span style={{ position: 'absolute', top: 0, right: 5, cursor: 'pointer' }} onClick={() => document.getElementById('popup').style.display = "none"}>x</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: `<figure class="table"><table style="background-color:rgb(255, 255, 255);"><tbody><tr><td style="padding:0px;width:18px;"><strong>◎</strong></td><td style="padding:0px;width:2000px;" colspan="3">[,revə'lu:∫n]</td></tr><tr><td style="padding:0px;width:18px;"><strong>※</strong></td><td style="padding:0px;width:2000px;" colspan="3"><strong>danh từ</strong></td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">sự xoay vòng; vòng quay; vòng, tua</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">revolutions per minute</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">số vòng quay mỗi phút</td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">(toán học); (thiên văn học) sự xoay vòng</td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">cuộc cách mạng (nhất là bằng vũ lực, lật đổ một chế độ cai trị)</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">the socialist revolution</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">cuộc cách mạng xã hội chủ nghĩa</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">the national democratic revolution</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">cuộc cách mạng dân tộc dân chủ</td></tr><tr><td style="padding:0px;">&nbsp;</td><td style="padding:0px;width:18px;"><strong>■</strong></td><td style="padding:0px;width:2000px;" colspan="2">cuộc cách mạng (sự thay đổi hoàn toàn về phương pháp, hoàn cảnh..)</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">a revolution in the treatment of cancer</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">một cuộc cách mạng trong cách điều trị ung thư</td></tr><tr><td style="padding:0px;" colspan="2">&nbsp;</td><td style="padding:0px;width:18px;"><strong>☆</strong></td><td style="padding:0px;width:2000px;">a technological revolution</td></tr><tr><td style="padding:0px;" colspan="3">&nbsp;</td><td style="padding:0px;width:2000px;">một cuộc cách mạng trong công nghệ</td></tr></tbody></table></figure>` }}></div>
        </div>
        <div id='longtext' dangerouslySetInnerHTML={{ __html: description }}></div>
      </>
    );
  }
}

export default Highlighter;