/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from "react";
import Stars from "../components/stars";
import "../css/restaurantPage.css";

const Information = ({ info, rating }) => {
  const getTag = (tags) => {
    return (
      <>
        {tags?.map((t) => (
          <div className="tag" key={t}>
            {t}
          </div>
        ))}
      </>
    );
  };
  const getPriceTag = (price) => {
    let priceText = "";
    for (let i = 0; i < price; i++) priceText += "$";
    return (
      <>
        {
          <div className="tag" key={price}>
            {priceText}
          </div>
        }
      </>
    );
  };

  const getBusiness = (time) => {
    return (
      <div className="businessTime">
        {
          /* TODO Part III-2-c: render business time for each day*/
          info.time === undefined ? null : info.time.All === undefined ? (
            <>
              {info.time.Mon === undefined ? (
                <div className="singleDay">
                  <div className="day">Mon</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Mon</div> <div className="time">{info.time.Mon}</div>
                </div>
              )}
              {info.time.Tue === undefined ? (
                <div className="singleDay">
                  <div className="day">Tue</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Tue</div> <div className="time">{info.time.Tue}</div>
                </div>
              )}
              {info.time.Wed === undefined ? (
                <div className="singleDay">
                  <div className="day">Wed</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Wed</div> <div className="time">{info.time.Wed}</div>
                </div>
              )}
              {info.time.Thr === undefined ? (
                <div className="singleDay">
                  <div className="day">Thr</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Thr</div> <div className="time">{info.time.Thr}</div>
                </div>
              )}
              {info.time.Fri === undefined ? (
                <div className="singleDay">
                  <div className="day">Fri</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Fri</div> <div className="time">{info.time.Fri}</div>
                </div>
              )}
              {info.time.Sat === undefined ? (
                <div className="singleDay">
                  <div className="day">Sat</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Sat</div> <div className="time">{info.time.Sat}</div>
                </div>
              )}
              {info.time.Sun === undefined ? (
                <div className="singleDay">
                  <div className="day">Sun</div> <div className="time">Closed</div>
                </div>
              ) : (
                <div className="singleDay">
                  <div className="day">Sun</div> <div className="time">{info.time.Sun}</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="singleDay">
                <div className="day">Mon</div> <div className="time">{info.time.All}</div>
              </div>
              <div className="singleDay">
                <div className="day">Tue</div> <div className="time">{info.time.All}</div>
              </div>
              <div className="singleDay">
                <div className="day">Wed</div> <div className="time">{info.time.All}</div>
              </div>
              <div className="singleDay">
                <div className="day">Thr</div> <div className="time">{info.time.All}</div>
              </div>
              <div className="singleDay">
                <div className="day">Fri</div> <div className="time">{info.time.All}</div>
              </div>
              <div className="singleDay">
                <div className="day">Sat</div> <div className="time">{info.time.All}</div>
              </div>
              <div className="singleDay">
                <div className="day">Sun</div> <div className="time">{info.time.All}</div>
              </div>
            </>
          )
        }
      </div>
    );
  };

  return (
    <div className="infoContainer">
      <h2>{info.name}</h2>
      <div className="infoRow">
        <div className="rate">
          {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}
        </div>
        <div className="distance">{info.distance / 1000} km</div>
      </div>
      <div className="infoRow">
        {getPriceTag(info.price)}
        {getTag(info.tag)}
      </div>
      <h5>Business hours:</h5>
      {getBusiness(info.time)}
    </div>
  );
};
export default Information;
