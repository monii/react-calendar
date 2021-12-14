import React from "react";
import styled from "styled-components";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as config from "../utils/config";

function Modal(props) {
  const {
    type = "",
    title = "",
    scheduleDate = "",
    isModalShow = false,
    onClickModalBtn = () => {},
    onChangeInputVal = () => {},
  } = props;

  return (
    <Styled.Modal>
      <div className={cx("modal", isModalShow ? "show" : "")}>
        <div className="modal-container">
          <section className="modal-header">
            <div className="modal-title">
              {type === config.ADD ? "일정 추가" : "일정 삭제"}
            </div>
            <div className="modal-close">
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={(e) => onClickModalBtn({ e: e, type: config.CLOSE })}
              />
            </div>
          </section>
          <section>
            <form>
              <div className="modal-content">
                <span className="modal-label">제목</span>
                <input
                  className="modal-input"
                  type="text"
                  name="title"
                  placeholder="일정을 입력해 주세요."
                  value={title}
                  onChange={onChangeInputVal}
                  readOnly={type === config.DELETE}
                />
                <span className="modal-label">날짜</span>
                <input
                  className="modal-input"
                  type="text"
                  name="scheduleDate"
                  placeholder="yyyy-mm-dd"
                  value={scheduleDate}
                  onChange={onChangeInputVal}
                  readOnly={type === config.DELETE}
                />
              </div>
              <div className="modal-footer">
                {type === config.ADD ? (
                  <button
                    type="submit"
                    className="modal-btn"
                    onClick={(e) => onClickModalBtn({ e: e, type: config.ADD })}
                  >
                    추가
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="modal-btn"
                    onClick={(e) =>
                      onClickModalBtn({ e: e, type: config.DELETE })
                    }
                  >
                    삭제
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </Styled.Modal>
  );
}

const Styled = {
  Modal: styled.div`
    .modal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 350px;
      height: 200px;
      padding: 40px;
      text-align: center;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
      transform: translateX(-50%) translateY(-50%);
    }
    .show {
      display: block;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .modal-close {
      cursor: pointer;
    }
    .modal-title {
      display: flex;
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
    }
    .modal-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      margin-bottom: 20px;
    }
    .modal-input {
      padding: 6px 12px;
      font-size: 12px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .modal-btn {
      padding: 6px 12px;
      margin-bottom: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      background: #1a1f27;
      color: #fff;
      border: 1px solid transparent;
      border-radius: 4px;
      cursor: pointer;
    }
  `,
};

export default Modal;
