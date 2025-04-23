'use client';

// import carbon components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  Column,
} from '@carbon/react';

// import icons used for the info cards
import {
  FaceSatisfied,
  ModelFoundation,
  AccessibilityAlt,
} from '@carbon/icons-react';

// import custom components
import { InfoSection, InfoCard } from '@/components/InfoCard/InfoCard';
import SkillFindr from '@/components/ChatbotWindow/SkillFindr';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      {/* main grid layout for landing page */}
      <Grid className="landing-page" fullWidth>
        {/* top section with title and breadcrumb */}
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="/">SkillFindr Showcase</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">Design &amp; Development</h1>
        </Column>

        {/* middle section with tabs */}
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Tabs defaultSelectedIndex={0}>
            <TabList className="tabs-group" aria-label="Page navigation">
              <Tab>About</Tab>
              <Tab>Design</Tab>
              <Tab>Development</Tab>
            </TabList>
            <TabPanels>
              {/* about tab content */}
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    md={4}
                    lg={7}
                    sm={4}
                    className="landing-page__tab-content">
                    <h3 className="landing-page__subheading">
                      What is SkillFindr?
                    </h3>
                    <p className="landing-page__p">
                      <strong>SkillFindr</strong> is a frontend web application
                      designed as a chatbot interface for IBM's{' '}
                      <strong>SkillsBuild</strong> platform. It serves as a
                      user-friendly assistant to help learners discover relevant
                      online courses more easily. The chatbot leverages{' '}
                      <strong>Large Language Model (LLM)</strong> capabilities
                      to recommend courses based on user input and preferences.
                      Unlike many existing platforms, SkillFindr focuses on
                      <strong> accessibility, responsiveness</strong>, and{' '}
                      <strong>IBM's Carbon Design System</strong> to ensure a
                      modern, consistent, and intuitive experience for users.
                    </p>
                    <Button>Learn more</Button>
                  </Column>
                  <Column md={4} lg={{ span: 8, offset: 8 }} sm={4}>
                    <Image
                      className="landing-page__illo"
                      src="/tab-illo.png"
                      alt="Carbon illustration"
                      width={604}
                      height={498}
                    />
                  </Column>
                </Grid>
              </TabPanel>

              {/* design tab content */}
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content">
                    <p className="landing-page__p">
                      SkillFindr's design follows IBM's Carbon Design System,
                      combining a clean, minimalist aesthetic with intuitive UI
                      components to ensure consistency, brand alignment, and a
                      seamless user experience.
                    </p>
                  </Column>
                </Grid>
              </TabPanel>

              {/* development tab content */}
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content">
                    <p className="landing-page__p">
                      SkillFindr is developed in React/Next.js with Carbon
                      Design System.
                    </p>
                  </Column>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>

        {/* bottom section with feature highlights */}
        <Column lg={16} md={8} sm={4} className="landing-page__r3">
          <InfoSection heading="The Principles">
            <InfoCard
              heading="SkillFindr is User-Friendly"
              body="SkillFindr is highly user-friendly due to its intuitive interface, clear visual hierarchy, and seamless navigation. By incorporating familiar design patterns and suggestion tags, users can interact with the chatbot effortlessly without needing prior technical knowledge."
              icon={() => <FaceSatisfied size={64} />}
            />
            <InfoCard
              heading="SkillFindr is Modular"
              body="SkillFindr's modularity ensures maximum flexibility in execution. Its components are designed to work seamlessly with each other, in whichever combination suits the needs of the user."
              icon={() => <ModelFoundation size={64} />}
            />
            <InfoCard
              heading="SkillFindr is Accessible"
              body="SkillFindr is designed with accessibility as a top priority, ensuring full compatibility with screen readers, keyboard navigation, and responsive layouts to provide an inclusive experience across all devices and for all users."
              icon={() => <AccessibilityAlt size={64} />}
            />
          </InfoSection>
        </Column>
      </Grid>

      {/* embedded chatbot component */}
      <SkillFindr />
    </>
  );
}
