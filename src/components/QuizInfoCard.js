import React, { Component } from "react";
import Header from "./Header";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class QuizInfoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quiz, onBack, onPress, logout, username } = this.props;
    return (
      <div>
        <Header logout={logout} />
        <div style={{ margin: "80px 3% 3% 3%" }}>
          {quiz.subQuiz.map((subQuiz, index) => {
            return (
              <Card
                style={{ maxWidth: 345, display: "inline-block", margin: "1%" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    style={{ objectFit: "cover" }}
                    height="140"
                    image={quiz.image}
                    title={subQuiz.name}
                  />

                  {subQuiz.score ? (
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                        style={{ textAlign: "left" }}
                      >
                        {subQuiz.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        style={{ textAlign: "left", fontSize: "13px" }}
                      >
                        Not satisfied with your result?
                        <Button
                          onClick={() => onPress(index)}
                          size="small"
                          color="primary"
                        >
                          Try again Now
                        </Button>
                      </Typography>
                      <br />
                      <Typography variant="body2" style={{ textAlign: "left" }}>
                        Percentage: {subQuiz.score} %
                        <br />
                        Attempted Date: {subQuiz.attemptDate}
                        <br />
                      </Typography>
                    </CardContent>
                  ) : (
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                        style={{ textAlign: "left" }}
                      >
                        {subQuiz.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        style={{ textAlign: "left", fontSize: "13px" }}
                      >
                        Quiz information
                      </Typography>
                      <br />
                      <Typography variant="body2" style={{ textAlign: "left" }}>
                        Total Questions: {subQuiz.questions}
                        <br />
                        Total Time: {subQuiz.time}
                        <br />
                        Passing Score: 60 %
                      </Typography>
                    </CardContent>
                  )}
                </CardActionArea>

                <CardActions>
                  <Button onClick={onBack} size="small" color="secondary">
                    back
                  </Button>
                  {!subQuiz.score ? (
                    <Button
                      onClick={() => onPress(index)}
                      size="small"
                      color="primary"
                    >
                      start
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default QuizInfoCard;
