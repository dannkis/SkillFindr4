'use client';

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
import {
  FaceSatisfied,
  ModelFoundation,
  AccessibilityAlt,
} from '@carbon/icons-react';
import { InfoSection, InfoCard } from '@/components/InfoCard/InfoCard';
import SkillFindr from '@/components/ChatbotWindow/SkillFindr';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem>
              <a href="/">SkillFindr Showcase</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="landing-page__heading">Design &amp; Development</h1>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Tabs defaultSelectedIndex={0}>
            <TabList className="tabs-group" aria-label="Page navigation">
              <Tab>About</Tab>
              <Tab>Design</Tab>
              <Tab>Develop</Tab>
            </TabList>
            <TabPanels>
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
                      designed as a chatbot interface for IBMs{' '}
                      <strong>SkillsBuild</strong> platform. It serves as a
                      user-friendly assistant to help learners discover relevant
                      online courses more easily. The chatbot leverages{' '}
                      <strong>Large Language Model (LLM)</strong> capabilities
                      to recommend courses based on user input and preferences.
                      Unlike many existing platforms, SkillFindr focuses on
                      <strong> accessibility, responsiveness</strong>, and{' '}
                      <strong>IBMs Carbon Design System</strong> to ensure a
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
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content">
                    <p className="landing-page__p">
                      SkillFindrs design follows IBMs Carbon Design System,
                      combining a clean, minimalist aesthetic with intuitive UI
                      components to ensure consistency, brand alignment, and a
                      seamless user experience.
                    </p>
                  </Column>
                </Grid>
              </TabPanel>
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
        <Column lg={16} md={8} sm={4} className="landing-page__r3">
          <InfoSection heading="The Principles">
            <InfoCard
              heading="SkillFindr is User-Friendly"
              body="SkillFindr is highly user-friendly due to its intuitive interface, clear visual hierarchy, and seamless navigation. By incorporating familiar design patterns and suggestion tags, users can interact with the chatbot effortlessly without needing prior technical knowledge."
              icon={() => <FaceSatisfied size={64} />}
            />
            <InfoCard
              heading="SkillFindr is Modular"
              body="SkillFindr's modularity ensures maximum flexibility in execution. It's components are designed to work seamlessly with each other, in whichever combination suits the needs of the user."
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
      <SkillFindr />
    </>
  );
}
