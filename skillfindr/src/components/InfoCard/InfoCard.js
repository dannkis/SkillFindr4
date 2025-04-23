import { Grid, Column } from '@carbon/react';

// splits a phrase into two parts: everything but the last word, and the last word
function createArrayFromPhrase(phrase) {
  const splitPhrase = phrase.split(' ');
  const thirdWord = splitPhrase.pop();
  return [splitPhrase.join(' '), thirdWord];
}

// component for a section layout using carbon grid with a heading and children
const InfoSection = ({ className, heading, children }) => (
  <Grid className={`${className} info-section`}>
    <Column sm={4} md={8} lg={16} xlg={3}>
      <h3 className="info-section__heading">{heading}</h3>
    </Column>
    {children}
  </Grid>
);

// card component displaying a heading split into two parts and an optional icon
const InfoCard = ({ heading, body, icon }) => {
  const splitHeadingParts = createArrayFromPhrase(heading);

  return (
    <Column sm={4} md={8} lg={5} xlg={4} className="info-card">
      <div>
        <h4 className="info-card__heading">
          {`${splitHeadingParts[0]} `}
          <strong>{splitHeadingParts[1]}</strong>
        </h4>
        <p className="info-card__body">{body}</p>
      </div>
      {icon()}
    </Column>
  );
};

export { InfoSection, InfoCard };
