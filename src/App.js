import React, { Component } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";
import QuizList from "./components/QuizList";
import QuizInfoCard from "./components/QuizInfoCard";
import StartQuiz from "./components/StartQuiz";
import "typeface-roboto";
import { Modal } from "@material-ui/core";
class App extends Component {
  constructor() {
    super();

    this.state = {
      //Add questions and options
      quizzes: [
        {
          name: "General Science IQ Test",
          image: require("./images/quizimage.JPG"),
          description:
            "This quiz is created to test your general knowledge related to Science and as it is time bound, be quick to answer the questions",
          subQuiz: [
            {
              name: "IQ Test 1",
              questions: "5",
              time: "30 sec",
              score: false,
              qArr: [
                {
                  question:
                    "Did the Apple iPhone first become available in 2005, 2006 or 2007?",
                  option1: "2005",
                  option2: "2006",
                  option3: "2007",
                  option4: "2008",
                  answer: "3"
                },
                {
                  question:
                    "What science fiction writer wrote the three laws of robotics?",
                  option1: "Isaac Asimov",
                  option2: "George Orwell",
                  option3: "John Scalzi",
                  option4: "Ray Bradbury",
                  answer: "1"
                },
                {
                  question: "By which mechanism does Atomic bomb works?",
                  option1: "Atomic fisson",
                  option2: "Atomic fusion",
                  option3: "None of above",
                  option4: "Both 1 and 2",
                  answer: "1"
                },

                {
                  question:
                    "The Hubble Space Telescope is named after which American astronomer?",
                  option1: "Eric Hubble",
                  option2: "Nicholas Hubble",
                  option3: "Edwin Hubble",
                  option4: "Edwina Hubble",
                  answer: "3"
                },

                {
                  question:
                    "The technologically advanced humanoid robot ASIMO is made by which car company?",
                  option1: "Honda",
                  option2: "Microsoft",
                  option3: "Tesla",
                  option4: "RoboX",
                  answer: "1"
                }
              ]
            }
          ]
        }
      ],

      quizIndex: null,
      subQuizIndex: null,

      qstnNo: 0,

      validFlag: false,
      userFlag: true,

      userName: "",
      userEmail: "",
      userPass: "",
      loginEmail: "",
      loginPass: "",

      user: localStorage.getItem("user")
    };
    //binding

    this.updateText = this.updateText.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.checkValidation = this.checkValidation.bind(this);

    this.joinQuiz = this.joinQuiz.bind(this);
    this.showList = this.showList.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.nextQstn = this.nextQstn.bind(this);
    this.back = this.back.bind(this);
    this.logout = this.logout.bind(this);
  }

  async updateText(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name.match("name")) {
      await this.setState({
        userName: value
      });
      localStorage.setItem("userName", this.state.userName);
    } else if (name.match("userEmail")) {
      await this.setState({
        userEmail: value
      });
      localStorage.setItem("userEmail", this.state.userEmail);
    } else if (name.match("userPassword")) {
      await this.setState({
        userPass: value
      });
      localStorage.setItem("userPass", this.state.userPass);
    } else if (name.match("loginEmail")) {
      await this.setState({
        loginEmail: value
      });
    } else if (name.match("loginPass")) {
      await this.setState({
        loginPass: value
      });
    }
  }

  showSignup() {
    this.setState({
      userFlag: false,
      loginEmail: "",
      loginPass: ""
    });
  }

  showLogin() {
    const { userEmail, userPass } = this.state;
    if (userEmail == "" || userPass == "") {
      alert("Fill all the fields");
    } else {
      this.setState({
        userFlag: true,
        userEmail: "",
        userPass: ""
      });
    }
  }

  showUserName() {
    const { loginEmail } = this.state;
    this.setState({
      username: loginEmail.setItem(localStorage.getItem("userEmail"))
    });
  }

  //check login credentianls
  async checkValidation() {
    const { loginEmail, loginPass } = this.state;
    if (
      loginEmail.match(localStorage.getItem("userEmail")) &&
      loginPass.match(localStorage.getItem("userPass"))
    ) {
      await this.setState({
        validFlag: true,
        user: true
      });
      localStorage.setItem("user", "true");
    }
    console.log("Email is Valid :", this.state.validFlag);
  }

  logout() {
    this.setState({
      user: "false",
      validFlag: false,
      loginEmail: "",
      loginPass: "",
      quiz: null,
      started: null,
      qstnNo: 0
    });
    localStorage.setItem("user", "false");
  }

  joinQuiz(quizIndex) {
    const { quizzes } = this.state;
    this.setState({
      quiz: quizzes[quizIndex],
      quizIndex: quizIndex,
      quizName: quizzes[quizIndex].name
    });
  }

  showList() {
    this.setState({ quiz: null });
  }

  startQuiz(subQuizIndex) {
    const { quizzes, quizIndex } = this.state;

    this.setState({
      started: quizzes[quizIndex].subQuiz[subQuizIndex],
      subQuizIndex: subQuizIndex,
      subQuizName: quizzes[quizIndex].subQuiz[subQuizIndex].name
    });
  }

  nextQstn(nextQstnNo) {
    this.setState({
      qstnNo: nextQstnNo + 1
    });
  }

  back() {
    this.setState({
      started: null,
      qstnNo: 0
    });
  }

  render() {
    const {
      userFlag,
      validFlag,
      quizzes,
      quiz,
      started,
      qstnNo,
      quizName,
      subQuizName,
      user,
      username
    } = this.state;

    return (
      <center>
        <div>
          {(user === "false" || user === null) && !userFlag && (
            <Signup updateText={this.updateText} showLogin={this.showLogin} />
          )}
          {(user === "false" || user === null) && (userFlag && !validFlag) && (
            <Login
              showSignup={this.showSignup}
              validation={this.checkValidation}
              updateText={this.updateText}
            />
          )}
          {(user === "true" || (userFlag && validFlag)) &&
            (!quiz && !started) && (
              <QuizList
                list={quizzes}
                onPress={this.joinQuiz}
                logout={this.logout}
              />
            )}
          {(user === "true" || (userFlag && validFlag)) &&
            (quiz && !started) && (
              <QuizInfoCard
                quiz={quiz}
                onPress={this.startQuiz}
                onBack={this.showList}
                logout={this.logout}
              />
            )}
          {(user === "true" || (userFlag && validFlag)) && started && (
            <StartQuiz
              quizName={quizName}
              subQuizName={subQuizName}
              started={started}
              qstnNo={qstnNo}
              onPress={this.nextQstn}
              back={this.back}
              logout={this.logout}
            />
          )}
        </div>
      </center>
    );
  }
}

export default App;
