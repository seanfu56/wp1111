import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useStyles } from "../hooks";
import { useScoreCard } from "../hooks/useScoreCard";
import { useQueryCard } from "../hooks/useQueryCard";
import {
  NEWSCORECARD_MUTATION,
  DELETEALLSCORECARDS_MUTATION,
  SCORECARD_NAME_QUERY,
  SCORECARD_SUBJECT_QUERY,
} from "../graphql";
import { useMutation, useLazyQuery } from "@apollo/client";
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } = useScoreCard();
  const { qmessages, qaddCardMessage, qaddRegularMessage, qaddErrorMessage } = useQueryCard();
  const [name_query, { data: name_data }] = useLazyQuery(SCORECARD_NAME_QUERY);
  const [subject_query, { data: subject_data }] = useLazyQuery(SCORECARD_SUBJECT_QUERY);
  const [addPost] = useMutation(NEWSCORECARD_MUTATION);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState("name");
  const [queryString, setQueryString] = useState("");

  const [value, setValue] = useState("1");

  const handleTab = () => {
    if (value === "1") {
      setValue("2");
    } else {
      setValue("1");
    }
  };

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const addPostReturn = await addPost({
      variables: { name: name, subject: subject, score: Number(score) },
    });
    console.log(addPostReturn.data.newScoreCard);
    addCardMessage("add", addPostReturn.data.newScoreCard);
  };

  useEffect(() => {
    console.log("name_data changed");
    if (name_data === undefined) {
      return;
    }
    if (name_data.getScoreCardsByName.length === 0) {
      return;
    }
    const array = name_data.getScoreCardsByName.map(
      (ele) => `Found card with name: (${ele.name}, ${ele.subject}, ${ele.score})`
    );
    addRegularMessage("query", ...array);
  }, [name_data]);

  useEffect(() => {
    console.log("subject_data changed");
    if (subject_data === undefined) {
      return;
    }
    if (subject_data.getScoreCardsBySubject.length === 0) {
      return;
    }
    const array = subject_data.getScoreCardsBySubject.map(
      (ele) => `Found card with subject: (${ele.name}, ${ele.subject}, ${ele.score})`
    );
    addRegularMessage("query", ...array);
  }, [subject_data]);

  const handleQuery = async () => {
    console.log("handle query");
    if (queryType === "name") {
      name_query({ variables: { name: queryString } });
    } else if (queryType === "subject") {
      subject_query({ variables: { subject: queryString } });
    }
  };

  return (
    <Wrapper>
      {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTab} aria-label="lab API tabs example">
            <Tab label="Add" value="1" />
            <Tab label="Query" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Row>
            {" "}
            <TextField
              className={classes.input}
              placeholder="Name"
              value={name}
              onChange={handleChange(setName)}
            />
            <TextField
              className={classes.input}
              placeholder="Subject"
              style={{ width: 240 }}
              value={subject}
              onChange={handleChange(setSubject)}
            />
            <TextField
              className={classes.input}
              placeholder="Score"
              value={score}
              onChange={handleChange(setScore)}
              type="number"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!name || !subject}
              onClick={handleAdd}
            >
              Add
            </Button>
          </Row>
          <ContentPaper variant="outlined">
            {messages.map((m, i) =>
              m.property === "add" ? (
                <Typography variant="body2" key={m + i} style={{ color: m.color }}>
                  {m.message}
                </Typography>
              ) : null
            )}
          </ContentPaper>
        </TabPanel>
        <TabPanel value="2">
          <Row>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup row value={queryType} onChange={handleChange(setQueryType)}>
                  <FormControlLabel value="name" control={<Radio color="primary" />} label="Name" />
                  <FormControlLabel
                    value="subject"
                    control={<Radio color="primary" />}
                    label="Subject"
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query string..."
              value={queryString}
              onChange={handleChange(setQueryString)}
              style={{ flex: 1 }}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!queryString}
              onClick={handleQuery}
            >
              Query
            </Button>
          </Row>
          <ContentPaper variant="outlined">
            {messages.map((m, i) =>
              m.property === "query" ? (
                <Typography variant="body2" key={i} style={{ color: m.color }}>
                  {m.message}
                </Typography>
              ) : null
            )}
          </ContentPaper>
        </TabPanel>
      </TabContext>
    </Wrapper>
  );
};

export default Body;
