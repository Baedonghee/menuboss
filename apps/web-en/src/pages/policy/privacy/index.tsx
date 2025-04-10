import React from 'react';
import { Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';

import PolicyLayout from '@/components/Layout/Policy';

const PolicyPrivacy = () => {
  return (
    <PolicyLayout>
      <Typography
        fontSize={theme.fontSize.text24}
        fontWeight={theme.fontWeight.bold}
        color={theme.color.black}
      >
        Privacy Policy
      </Typography>
      <ul className="policy-list">
        <li className="mt-24">
          This “Privacy Policy” provides a comprehensive overview of the privacy practices
          implemented by KIMS GROUP USA, including its subsidiaries and affiliates, such as MenuBoss
          (collectively referred to as “MenuBoss,” “we,” “us,” or “our”). These practices apply to
          various aspects of our services, which encompass the TheMenuBoss.com website, the MenuBoss
          content management system (including digital signage software and associated
          applications), and any other website or mobile application that we own or control and that
          explicitly displays or links to this Privacy Policy (referred to as the “Service”). In
          addition, this policy outlines the rights and choices that individuals have concerning
          their information. At times, MenuBoss may offer specific products or services for which we
          may provide additional or supplemental privacy policies to individuals. These additional
          policies will be presented to users when collecting personal information and will govern
          the processing of such information in the specific context of the corresponding product or
          service.
        </li>
        <li>
          <ul>
            <li className="title mt-24">TABLE OF CONTENTS</li>
            <li>- Personal Information We Collect</li>
            <li>- How We Use Your Personal Information</li>
            <li>- How We Share Your Personal Information</li>
            <li>- Your Choices</li>
            <li>- Other sites, mobile applications, and services</li>
            <li>- Security practices</li>
            <li>- International data transfers</li>
            <li>- Children</li>
            <li>- Changes to this Privacy Policy</li>
            <li>- How to Contact Us</li>
            <li>- Your European Privacy Rights</li>
            <li>- Cookie Policy</li>
            <li>- What are cookies?</li>
            <li>
              - What types of cookies and similar tracking technologies does MenuBoss use on the
              Sites?
            </li>
            <li>- Your choices</li>
            <li>- Changes</li>
            <li>- Questions</li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Personal Information We Collect</li>
            <li>
              information that you provide us. You may give us personal information about you in a
              variety of ways, including through the Service:
            </li>
            <li>
              <ul>
                <li>
                  - Contact information for both business and personal purposes, including your
                  first and last names, mailing and email addresses, phone number, occupation, and
                  firm name.
                </li>
                <li>
                  - The content you select to post to the Service, including any text, photos,
                  music, or video files, as well as the file metadata.
                </li>
                <li>
                  - Your username and password, which you may set to create an online account with
                  us, are examples of profile information.
                </li>
                <li>
                  - Information collected during registration, such as details pertaining to a
                  service, an account, or an event you sign up for.
                </li>
                <li>
                  - Feedback or communication, such as the details you give us when you e-mail us
                  with queries, suggestions, or in any other way communicate with us online.
                </li>
                <li>
                  - Demographic data, including your age, postal code, city, state, and country of
                  residence.
                </li>
                <li>
                  - Information concerning payments to and from you, as well as any specifics about
                  the goods or services you have purchased from us, constitutes a transaction.
                </li>
                <li>
                  - Usage information, such as details about how you use the Service and communicate
                  with us, as well as details about any content you post to our websites or
                  otherwise send to us, as well as details you give us when you use any of the
                  Service’s interactive features.
                </li>
                <li>
                  - Marketing data, including your choices for receiving messages about our events,
                  publications, and activities, as well as information on how you interact with such
                  communications
                </li>
                <li>
                  - We may also gather unspecified data that we will use in compliance with this
                  privacy statement or as otherwise stated at the time of acquisition.
                </li>
              </ul>
            </li>
            <li>
              We collect information from various social media platforms where MenuBoss maintains
              pages, including Facebook, LinkedIn, Twitter, Google, YouTube, Instagram, and other
              third-party platforms. When you visit or engage with our pages on these platforms, the
              privacy policy of the respective platform provider will govern the collection, use,
              and processing of your personal information. Both you and the platforms have the
              ability to provide us with information through these platforms, and we handle such
              information in accordance with our Privacy Policy.
            </li>
            <li>
              If you choose to log in to the Service using a third-party platform or connect your
              account on a third-party platform or network to your Service account, we may gather
              information from that platform or network. This may include your email address, user
              ID, profile picture, cover photo, and networks to which you belong (such as your
              school or workplace). We utilize Auth0 for our authorization and authentication needs.
              You can review their privacy and cookie policy for more details on the data they
              collect (
              <a
                href="https://auth0.com/privacy/"
                style={{ display: 'inline-block' }}
                target="_blank"
                rel="noreferrer"
              >
                https://auth0.com/privacy/
              </a>
              ). To learn more about your choices related to third-party platforms or social media
              networks, please refer to the “Third-party platforms or social media networks” section
              within the “Your Choices” portion of this policy.
            </li>
            <li>
              Furthermore, we may receive personal information about you from other third-party
              sources. For instance, if you have expressed interest in our products or services or
              the types of products or services we offer, a business partner may share your contact
              information with us. We may also acquire your personal information from marketing
              partners, publicly available sources, and data providers.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">
              Cookies and Other Information Collected by Automated Means
            </li>
            <li>
              We, along with our service providers and business partners, have the capability to
              automatically log information about you, your computer or mobile device, and your
              activities on or through the Service. This automatic collection of information
              includes details such as the type and version of your computer or mobile device’s
              operating system, the manufacturer and model of your device, device identifiers like
              the Google Advertising ID or Apple ID for Advertising, browser type, screen
              resolution, IP address, the website you visited prior to accessing our website,
              general location information (such as city, state, or geographic area), and
              information regarding your usage and actions on the Service. This includes data such
              as the pages or screens you viewed, the duration of your visit on a page or screen,
              the paths you took between pages or screens, details about your activities on a page
              or screen, access times, and the length of your access. It’s important to note that
              our service providers and business partners may collect this type of information over
              time and across various third-party websites and mobile applications.
            </li>
            <li>
              To gather this information on our web pages, we utilize technologies like cookies,
              browser web storage (also known as locally stored objects or “LSOs”), web beacons, and
              similar technologies. Additionally, our emails may contain web beacons. In the case of
              our applications, we may collect this information directly or through the
              implementation of third-party software development kits (“SDKs”). These SDKs may allow
              third parties to collect information directly from our applications.
            </li>
            <li>
              For further details on the collection and usage of such information, please refer to
              our Cookie Policy.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Referrals</li>
            <li>
              As a user of the Service, you may have the option to refer friends or other contacts
              to us. However, it’s important to note that if you are an existing user, you can only
              submit a referral if you have obtained proper permission to share the contact
              information of the referred individual with us. This is to ensure that we can reach
              out to them as necessary.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">How We Use Your Personal Information</li>
            <li>
              We utilize your personal information for the following purposes, as well as in
              accordance with this Privacy Policy or as stated during the information collection
              process:
            </li>
            <li>
              <ul>
                <li>
                  - Information concerning payments to and from you, as well as any specifics about
                  the goods or services you have purchased from us, constitutes a transaction.
                </li>
                <li>
                  - Usage information, such as details about how you use the Service and communicate
                  with us, as well as details about any content you post to our websites or
                  otherwise send to us, as well as details you give us when you use any of the
                  Service’s interactive features
                </li>
                <li>
                  - Marketing data, including your choices for receiving messages about our events,
                  publications, and activities, as well as information on how you interact with such
                  communications
                </li>
                <li>
                  - We may also gather unspecified data that we will use in compliance with this
                  privacy statement or as otherwise stated at the time of acquisition.
                </li>
                <li>- Maintain and offer support for the Service.</li>
                <li>- Reply to your inquiries, concerns, and criticism.</li>
              </ul>
            </li>
            <li>
              We analyze the usage of the Service for research and development purposes. This
              includes evaluating user demographics and their interactions with the Service. By
              doing so, we aim to enhance the Service and develop new products and services that
              align with user needs and preferences.
            </li>
            <li>
              We may send you marketing and promotional communications related to MenuBoss, as
              permitted by applicable laws. However, you will always have the option to opt-out of
              receiving such communications. More details on how to exercise this choice can be
              found in the “Opt out of marketing” section below.
            </li>
            <li>
              We utilize your personal information to comply with applicable laws, lawful requests,
              and legal processes. This may involve responding to subpoenas or requests from
              government authorities. We will only use your personal information as we deem
              necessary or appropriate to fulfill these legal obligations.
            </li>
            <li>
              Ensuring compliance, preventing fraud, and maintaining safety are important to us.
              Thus, we may use your personal information and disclose it to law enforcement,
              government authorities, and relevant parties when we believe it is necessary or
              appropriate to: (a) safeguard our rights, your rights, or the rights of others,
              including privacy, safety, or property rights (which may involve initiating or
              defending legal claims); (b) enforce the terms and conditions governing the Service;
              and (c) protect, investigate, and deter against fraudulent, harmful, unauthorized,
              unethical, or illegal activities.
            </li>
            <li>
              In certain cases, we may explicitly request your consent to collect, use, or share
              your personal information. This typically occurs when required by law or in specific
              circumstances.
            </li>
            <li>
              We may generate anonymous, aggregated, or de-identified data from your personal
              information, as well as the personal information of other individuals we collect
              information from. This process involves removing information that can personally
              identify you from the data. The resulting anonymous, aggregated, or de-identified data
              may be used for lawful business purposes, including analysis and improvement of the
              Service, as well as promoting our business. We may also share this data with third
              parties for similar purposes.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">How We Share Your Personal Information</li>
            <li>
              With the exception of the following situations or as otherwise noted in this privacy
              statement, we never disclose your personal information to third parties without your
              consent:
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Affiliates:</span> In accordance with this
              Privacy Policy, we can disclose your personal information to our corporate parent,
              subsidiaries, and affiliates.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Service Providers:</span> Your personal
              information may be disclosed to third parties who perform functions for us or assist
              us in running the Service, including those who offer customer service, hosting,
              analytics, email delivery, marketing, payment processing, and database management
              services. These third parties are not permitted to use or disclose your personal
              information for any other reason than as instructed or allowed by us and in accordance
              with this privacy statement.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>
                Third-Party Platforms And Social Media Networks:
              </span>{' '}
              If you have enabled features or functionality that establish a connection between the
              Service and a third-party platform or social media network (for instance, by logging
              in to the Service using your third-party account, providing an API key or access token
              to the Service, or linking your Service account with a third-party’s services), we may
              disclose the personal information that you have authorized us to share. It is
              important to note that we do not have control over how the third party utilizes your
              personal information.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>
                Other Users Of The Service And the Public:
              </span>{' '}
              We may provide features that let you share personal data with other Service users or
              the general public. Additionally, you might be able to upload material to the Service
              (including testimonials, blogs, polls, images, and videos that you can show using our
              digital signage software). You may be able to choose which information is published
              publicly or to other users by using options that we may make accessible through the
              Account management page. Any private information that you disclose to other users or
              the general public is not subject to our control.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Professional Advisors:</span> We may disclose
              your personal information to professional advisors, such as lawyers, bankers,
              auditors, and insurers, where necessary in the course of the professional services
              that they render to us.
              <br />
              For Compliance, fraud protection and safety: For the aforementioned compliance, fraud
              prevention, and safety reasons, we could divulge your personal information.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Business Transfers:</span> In the event of a
              business transaction, such as a corporate divestiture, merger, consolidation,
              acquisition, reorganization, sale of assets, bankruptcy, or dissolution, we may sell,
              transfer, or otherwise share some or all of our business or assets, which may include
              your personal information.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Your Choices</li>
            <li>
              We outline the options and privileges available to all users in this section. Below is
              further information about your rights for users who are based in Europe and other
              users whose personal data is handled in connection with our activities in Europe.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Access Or Update Your Information:</span> You
              may examine and change specific personal information in your account profile by login
              into the account if you have registered for one with us.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Opt Out Of Marketing Communications:</span> By
              adhering to the opt-out or unsubscribe instructions at the bottom of the email, you
              can choose not to receive marketing-related communications. Service-related and other
              non-marketing communications may still be sent to you.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Cookies & Browser Web Storage:</span> Your
              browser activity across the Service and other third-party websites may be tracked over
              time by service providers and other third parties using cookies and similar
              technologies. Refer to our Cookie Policy for more information.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Targeted Online Advertising:</span> Some of the
              business partners who gather data on users’ actions on or through the Service may be
              participants in groups or initiatives that provide people options about the use of
              their web surfing or use of mobile applications for the purpose of targeted
              advertising.
            </li>
            <li>
              Users have the option to opt out of receiving targeted advertising on websites through
              the Network Advertising Initiative by clicking here or through the Digital Advertising
              Alliance by clicking here. European users can opt out of receiving targeted
              advertising on websites through the European Interactive Digital Advertising Alliance
              by clicking here, selecting their country, and clicking on the “Choices” or similarly
              titled link.
            </li>
            <li>
              Users of our mobile applications can opt out of receiving targeted advertising in
              mobile apps through participating members of the Digital Advertising Alliance by
              installing the AppChoices mobile app, available here, and making their choices within
              the app. It’s important to note that we may collaborate with companies that provide
              their own opt-out mechanisms, which may not be covered by the opt-out mechanisms we
              have provided above.
            </li>
            <li>
              Furthermore, your mobile device settings may offer functionalities that allow you to
              limit our or our partners’ ability to engage in ad tracking or targeted advertising
              using the Google Advertising ID or Apple ID for Advertising associated with your
              mobile device.
            </li>
            <li>
              If you decide to opt out of targeted advertisements, you may still encounter online
              advertisements, but they might not be tailored to your interests. It’s worth noting
              that not all companies engaged in online behavioral advertising are included in the
              provided opt-out lists, so you may still receive certain cookies and personalized
              advertisements from companies not listed.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>Do Not Track:</span> Some web browsers can be
              set up to notify websites you visit about “Do Not Track” signals. Right now, we don’t
              comply with “Do Not Track” or comparable signals. To learn more about “Do Not Track,”
              go to{' '}
              <a
                href="http://www.allaboutdnt.com"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-block' }}
              >
                http://www.allaboutdnt.com
              </a>
              .
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>
                Choosing Not To Share Your Personal Information:
              </span>{' '}
              If you don’t supply the information when asked for (or subsequently request its
              deletion), we might not be able to offer you our services where we are legally
              obligated to gather your personal information or where we need it in order to deliver
              the Service to you. By identifying it as necessary at the time of collection or by
              using other suitable channels, we will advise you of the information you are needed to
              give in order to use the Service.
            </li>
            <li>
              <span style={{ fontWeight: 'bold ' }}>
                Third-Party Platforms Or Social Media Network:
              </span>{' '}
              If you choose to connect to the Service using a third-party platform, you might be
              able to restrict the data that we might collect from the third party when you use the
              third-party’s authentication service to log in to the Service or otherwise link your
              account. The third party’s platform or service may then allow you to manage your
              settings. For instance, the Google permissions page for Apps and Websites allows you
              to view and modify your settings. If you want to restrict our use of a platform or
              social media network operated by a third party, it will not apply to information we
              have already obtained from that third party.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Other Sites, Mobiles Applications And Services</li>
            <li>
              The Service may include links to other websites, mobile applications, and online
              services that are operated by third parties. These links are provided for convenience
              purposes and do not indicate our endorsement or affiliation with any third party.
              Additionally, our content may be featured on web pages, mobile applications, or online
              services that are not directly associated with us.
            </li>
            <li>
              We do not have control over third-party websites, mobile applications, or online
              services and are not responsible for their actions. It’s important to note that these
              third-party websites and services have their own policies regarding the collection,
              use, and sharing of personal information, which may differ from ours. We recommend
              that you review the privacy policies of the other websites, mobile applications, and
              online services that you utilize.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Security Practices</li>
            <li>
              We place a high priority on the security of your personal information. We use a
              variety of administrative, technological, and physical security measures to secure the
              personal data we collect. We cannot, however, guarantee the security of your personal
              information because security risk is a component of all internet and information
              technologies.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">International Data Transfers</li>
            <li>
              Your personal information might be transferred to the EU, the United Kingdom, or other
              locations outside of your state, province, or country because we are headquartered
              there and have service providers there. In these locations, privacy laws might not be
              as protective as those in your state, province, or country.
            </li>
            <li>
              The crucial information concerning the transfer of personal information outside of
              Europe is provided below for users who are based in Europe.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Children</li>
            <li>
              Anyone under the age of 16 is not intended for use of the Service, and we do not
              intentionally collect personal information from them. If a parent or guardian learns
              that their kid has shared information with us without their permission, he or she
              should get in touch with us. We shall remove such data from our records as soon as it
              is practical to do so. We invite worried parents to get in touch with us.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Changes To This Privacy Policy</li>
            <li>
              We retain the right to make changes to this Privacy Policy as we deem necessary. In
              the event of significant alterations to this Privacy Policy, we will inform you by
              updating the date of the policy and publishing it on the Service. If required by
              applicable law, we may also use other means of notification that we believe are
              reasonably effective in reaching you, such as sending an email (if we have your
              contact information on file) or utilizing another method through the Service.
            </li>
            <li>
              Any modifications to this Privacy Policy will become effective once we have posted the
              revised terms and/or implemented the changes on the Service, as indicated at the time
              of posting. By continuing to use the Service after the modified Privacy Policy has
              been posted, you indicate your acceptance of the updated terms set forth in the
              Privacy Policy.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">How To Contact Us</li>
            <li>
              Please email help@themenuboss.com with any inquiries or concerns you may have
              regarding this Policy or our privacy practices. You can also get in touch with us
              through the methods listed on the contact page of our website,{' '}
              <a
                href="https://www.themenuboss.com"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-block' }}
              >
                https://www.themenuboss.com
              </a>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Your California Privacy Rights</li>
            <li>
              In accordance with California Civil Code section 1798.83, residents of California have
              the right to request a notice that identifies the categories of personal customer
              information we disclose to our affiliates and/or third parties for marketing purposes.
              This notice also includes contact information for such affiliates and/or third
              parties.
            </li>
            <li>
              If you are a California resident and would like to receive a copy of this notice,
              please send a written request to us on 631 S. Palm st. STE F LA Habra CA 90631, or via
              email at help@themenuboss.com. In your request, please include the statement “Your
              California Privacy Rights,” along with your name, street address, city, state, and ZIP
              code. Please note that we cannot be held responsible for requests that are improperly
              labeled, sent, or lack complete information.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Your European Privacy Rights</li>
            <li>
              The information provided in this section pertains to individuals located in Europe and
              to any other individuals whose personal data is processed within the scope of our
              operations in Europe. It is important to note that when we mention “Europe,” we
              encompass the member states of the European Union, European Economic Area, and the
              United Kingdom.
            </li>
            <li>
              Personal information: The term “personal information” used in this Privacy Policy is
              synonymous with “personal data” as governed by European data protection legislation.
            </li>
            <li>
              Controller and Data Protection Officer: KIMS GROUP USA Inc. are joint controllers of
              your personal information covered by this Privacy Policy in compliance with European
              data protection legislation. We have designated a Data Protection Officer, and their
              contact information is as follows: help@themenuboss.com.
            </li>
            <li>
              Legal bases for processing: We only utilize your personal information in accordance
              with applicable laws. The legal bases we rely on for processing the personal
              information outlined in this Privacy Policy are described in the table provided below.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Processing Purpose</li>
            <li>
              The section above under “How we use your personal information” provides details on
              each processing purpose stated below.
            </li>
            <li>Based on law</li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">TO OPERATE THE SERVICE</li>
            <li>
              Processing is required to carry out the terms of the agreement regulating our supply
              of the Service or to carry out your pre-registration request for the Service. If we do
              not already have a contract with you, we will handle your personal data in order to
              fulfill your request for access to and use of the Service.
            </li>
            <li>
              <ul>
                <li>- To oversee activities</li>
                <li>- For growth and study</li>
                <li>- To contact you with marketing materials</li>
                <li>- In order to see adverts</li>
                <li>- To oversee our hiring process and handle job applications</li>
                <li>- For security, preventing fraud, and adherence</li>
                <li>- Generating anonymous data</li>
              </ul>
            </li>
            <li>
              These are the lawful pursuits of our interests. Unless we have your approval or are
              otherwise required or authorized by law, we do not use your personal information for
              these purposes when our interests are outweighed by the impact on you.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">To Comply With Law</li>
            <li>Processing is required in order for us to uphold our legal commitments.</li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">With Your Consent</li>
            <li>
              The legal basis for processing your personal information varies depending on the
              specific circumstances. In some cases, we may process your information based on your
              consent. If we rely on your consent, you have the right to withdraw it at any time by
              following the instructions provided when you initially provided your consent or
              through the settings available in the Service.
            </li>
            <li>
              For the operation of the Service, we process your personal information based on the
              necessity to perform the contract between us. This includes carrying out the necessary
              actions to provide you with the Service you requested or to take steps at your request
              before entering into a contract. If there is no existing contract, we process your
              personal information based on our legitimate interest in delivering the Service you
              access and request.
            </li>
            <li>
              We may process your personal information for various purposes that are considered our
              legitimate interests. These activities include administering events, conducting
              research and development to improve the Service, sending you marketing communications,
              displaying advertisements, managing recruitment and processing employment
              applications, ensuring compliance, fraud prevention, safety measures, and create
              anonymous data. We only use your personal information for these purposes when our
              legitimate interests are not overridden by the impact on your rights and interests
              unless we have obtained your consent or are otherwise required or permitted by law.
            </li>
            <li>
              In order to comply with our legal obligations, we may process your personal
              information when necessary. This includes situations where processing is required to
              meet legal requirements imposed on us.
            </li>
            <li>
              If we intend to use your personal information for purposes not described in this
              Privacy Policy, we will do so only if permitted by law and if the new purpose is
              compatible with the original purpose for which the information was collected. In such
              cases, we will provide you with notice and explain the applicable legal basis for the
              new use of your personal information.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">
              Sensitive Personal Information (Or ‘Special Category’ Data): We Kindly Ask That You
              Refrain From Sending Us Any Sensitive Personal Information (Such As Details About Your
              Racial Or Ethnic Origin, Political Opinions, Religious Or Other Beliefs, Health,
              Biometrics Or Genetic Makeup, Criminal History, Or Membership In A Trade Union)
              Through The Service Or In Any Other Way. You Must Give Us Your Agreement To Handle And
              Use Any Sensitive Personal Information You Submit To Us While Using The Service In
              Accordance With This Privacy Policy. You Must Not Submit Any Sensitive Personal
              Information Through Our Service If You Do Not Authorize Our Processing And Use Of That
              Information.Retention
            </li>
            <li>
              We retain your personal data for as long as it is necessary to fulfill the purposes
              for which it was collected. This includes meeting any legal, accounting, or reporting
              obligations we are subject to, as well as supporting or defending legal claims and
              preventing fraud.
            </li>
            <li>
              When determining the appropriate retention period, we consider various factors such as
              the amount, nature, and sensitivity of the personal information involved, the
              potential risk of harm from unauthorized use or disclosure of the information, the
              purposes for which we process the personal data, and whether those purposes can be
              achieved through alternative means. Additionally, we take into account any applicable
              legal requirements that dictate the retention of certain types of personal data.
            </li>
            <li>
              Once the retention period expires, we will securely dispose of or anonymize your
              personal information in a manner that ensures its protection and prevents unauthorized
              access or use.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Your Rights</li>
            <li>
              You have a number of rights regarding your personal information under European data
              protection legislation. You may request that we take the following measures with
              respect to your personal information that we have if you are situated in Europe or if
              it is processed in connection with our business there:
            </li>
            <li>
              You have the right to exercise certain rights regarding your personal information.
              These rights include:
            </li>
            <li>
              <ul>
                <li>
                  1. <span style={{ fontWeight: 'bold' }}>Access:</span> You can request information
                  about how we process your personal information and obtain a copy of the personal
                  information we hold about you.
                </li>
                <li>
                  2. <span style={{ fontWeight: 'bold' }}>Correction:</span> If you believe that any
                  of your personal information held by us is inaccurate or incomplete, you can
                  request us to update or correct it.
                </li>
                <li>
                  3. <span style={{ fontWeight: 'bold' }}>Deletion:</span> You have the right to
                  request the deletion of your personal information in certain circumstances, such
                  as when it is no longer necessary for the purposes for which it was collected or
                  if you have withdrawn your consent and there is no other legal basis for
                  processing.
                </li>
                <li>
                  4. <span style={{ fontWeight: 'bold' }}>Data Portability:</span> You can request a
                  machine-readable copy of your personal information or ask us to transfer it to a
                  third party of your choice in a structured, commonly used, and machine-readable
                  format.
                </li>
                <li>
                  5. <span style={{ fontWeight: 'bold' }}>Restriction:</span> You have the right to
                  request the restriction of processing your personal information under certain
                  circumstances, such as when you contest the accuracy of the information or when
                  the processing is unlawful but you do not want it to be deleted.
                </li>
                <li>
                  6. <span style={{ fontWeight: 'bold' }}>Objection:</span> You can object to our
                  processing of your personal information when we rely on legitimate interests as
                  the legal basis for processing. We will assess your objection and consider whether
                  our legitimate interests override your rights and freedoms.
                </li>
              </ul>
            </li>
            <li>
              To exercise these rights, you can contact us by email at help@themenuboss.com or by
              sending a written request to our postal address provided above. We may need to verify
              your identity and request specific information to process your request effectively.
              Please note that there may be legal limitations or exceptions that could restrict your
              rights.
            </li>
            <li>
              If we are unable to fulfill your request, we will explain the reasons for our
              decision, subject to any legal restrictions. If you are not satisfied with our use of
              your personal information or our response to your requests, you have the right to
              lodge a complaint with the data protection regulator in your jurisdiction. You can
              find the contact details of your data protection regulator on their official website.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Cross-Border Data Transfer</li>
            <li>
              In the event of transferring your personal information from Europe to the United
              States or South Korea, countries that may not possess an adequate level of personal
              information protection as determined by the European Commission, we will ensure that
              such transfers comply with the applicable European requirements. This may encompass
              the following measures:
            </li>
            <li>
              <ul>
                <li>
                  1. Standard Contractual Clauses: We may transfer your personal information to a
                  recipient outside of Europe based on their compliance with standard contractual
                  clauses approved by the European Commission. These clauses provide appropriate
                  safeguards for the protection of your personal information.
                </li>
                <li>
                  2. EU-US Privacy Shield or Swiss-US Privacy Shield: If the transfer is to the
                  United States, we may rely on the EU-US Privacy Shield or Swiss-US Privacy Shield
                  framework, as applicable. These frameworks establish a mechanism for companies to
                  comply with data protection requirements when transferring personal information
                  between Europe and the United States.
                </li>
                <li>
                  3. Binding Corporate Rules: In certain cases, we may rely on Binding Corporate
                  Rules, which are internal rules adopted by our organization that provide
                  safeguards for the transfer of personal information within our group of companies.
                </li>
              </ul>
            </li>
            <li>
              Additionally, we may transfer your personal information with your consent or as
              otherwise permitted by applicable European requirements.
            </li>
            <li>
              If you would like more information about the specific mechanism used by us when
              transferring your personal information out of Europe, you can contact us for further
              details.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">Cookie Policy</li>
            <li>
              This Cookie Policy provides an explanation of how KIMS GROUP USA and its subsidiaries
              and affiliates, including MenuBoss Limited (referred to as “MenuBoss,” “we,” “us,” or
              “our”), utilize cookies and similar technologies in relation to the screen.cloud
              website and any other websites under our ownership or control that display or link to
              this Cookie Policy (collectively referred to as the “Sites”).
            </li>
            <li>
              This policy also extends to the MenuBoss Player and any other mobile applications
              under our ownership or control that display or link to this Cookie Policy
              (collectively referred to as the “Apps”).
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">What Are Cookies?</li>
            <li>
              When you visit our websites, small data files called cookies are placed on your
              computer or mobile device. These cookies have various purposes, such as helping us
              understand how the website is used, enhancing navigation between pages, remembering
              your preferences, and improving your overall browsing experience.
            </li>
            <li>
              There are two types of cookies used on our Sites: session cookies and persistent
              cookies. Session cookies expire when you close your web browser, while persistent
              cookies remain on your computer or mobile device until you delete them.
            </li>
            <li>
              We utilize two main categories of cookies. First-party cookies are directly served by
              us to your computer or mobile device. These cookies enable us to recognize your device
              when you revisit our Sites. Third-party cookies, on the other hand, are served by our
              service providers or business partners on our Sites.
            </li>
            <li>
              These cookies allow these parties to recognize your device when you visit other
              websites. Third-party cookies serve various purposes, including site analytics,
              advertising, and social media features.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title mt-24">
              What Types Of Cookies And Similar Tracking Technologies Does MenuBoss Use On The
              Sites?
            </li>
            <li>
              In the areas shown in the table below, we employ cookies and other technologies for
              monitoring on the Sites.
            </li>
            <li>
              <ul>
                <li className="title">Advertising</li>
                <li>
                  - Advertising companies utilize these cookies to gather information about your
                  usage of our Sites as well as other websites. This data is then used by these
                  companies to display advertisements that they deem relevant to you, both within
                  our Service and on other platforms. Additionally, these cookies enable them to
                  assess the performance of the displayed ads.
                </li>
                <li>
                  - Examples of advertising companies that may use these cookies include Facebook,
                  Twitter, Google Ads, LinkedIn, Bing Ads, Quora, Pinterest, Capterra, G2, and
                  Influ2.
                </li>
                <li>
                  - Please refer to the “your choices” section below for information regarding the
                  options available to you in relation to these cookies.
                </li>
                <li className="title">Analytics</li>
                <li>
                  - These cookies play a crucial role in providing us with insights into the
                  performance and usage of our Service. They help us analyze how our Service is
                  being used and enable us to make improvements accordingly. Additionally, when we
                  send emails, these cookies may collaborate with web beacons to track the opening
                  of emails and the clicking of links by recipients.
                </li>
                <li>
                  - Examples of these types of cookies include Google Analytics, Visual Web
                  Optimizer, and Snowplow.
                </li>
                <li>
                  - For more information about Google Analytics cookies and how Google protects your
                  data, please refer to the respective links provided here. To prevent the use of
                  Google Analytics in relation to your use of our Sites, you can download and
                  install a browser plugin from the link provided here.
                </li>
                <li>
                  - Please consult the “your choices” section below for additional options available
                  to you concerning these cookies.
                </li>
                <li className="title">Essential</li>
                <li>
                  - Certain cookies are essential for the proper functioning and technical operation
                  of our Service. These cookies enable you to navigate and utilize the features of
                  our website smoothly.
                </li>
                <li>- Examples of such necessary cookies include Google Tag Manager and Auth0.</li>
                <li>
                  - Please refer to the “your choices” section below to explore the available
                  options regarding these cookies.
                </li>
                <li className="title">Functionality / Performance</li>
                <li>
                  - We utilize certain cookies to enhance the performance and functionality of our
                  Service, providing an improved user experience.
                </li>
                <li>
                  - Examples of these performance and functionality cookies include Drift, Zendesk,
                  and Beamer.
                </li>
                <li>
                  - To learn more about your options and choices regarding these cookies, please
                  refer to the “your choices” section below.
                </li>
                <li className="title">Other Technologies</li>
                <li>
                  - In addition to cookies, we may employ other technologies on our Sites to collect
                  information automatically. These technologies include Flash technology and pixel
                  tags.
                </li>
                <li className="title">Browser Web Storage</li>
                <li>
                  - In addition to cookies and other technologies, we may utilize browser web
                  storage, including HTML5, which is also referred to as locally stored objects
                  (LSOs). Browser web storage serves similar purposes as cookies but allows for the
                  storage of a larger volume of data.
                </li>
                <li>
                  - With browser web storage, we can store and retrieve data on your web browser,
                  enabling us to enhance your browsing experience and provide certain functionality
                  on our sites. Your web browser may offer options to manage and clear your browser
                  web storage if desired.
                </li>
                <li className="title">Web Beacons</li>
                <li>
                  - In order to track user behavior on our sites and interactions with our emails,
                  we may also utilize web beacons, often referred to as pixel tags and clear GIFs,
                  on our websites and in HTML-formatted emails. In contrast to cookies, which a
                  website places on your computer or mobile device’s hard drive, pixel tags are
                  subtly inserted into web pages or HTML-formatted emails.
                </li>
                <li>
                  - Pixel tags are used to show that a website was visited or that a certain piece
                  of content was read, generally to gauge the effectiveness of our marketing efforts
                  or the response to our emails and to gather data on how people are using the Sites
                  so that we can better manage our content.
                </li>
                <li className="title">Mobile Application Software Development Kits (SDKs)</li>
                <li>
                  - In our mobile apps, we could employ third-party software development kits (or
                  “SDKs”). A SDK is a piece of third-party software that may be used for a number of
                  things, such giving us data on how people are using our mobile applications,
                  integrating with social networking, enhancing the functionality of our app, or
                  facilitating online advertising. Third parties may be able to directly gather
                  information using our App thanks to SDKs.
                </li>
                <li className="title">Your Choices</li>
                <li>
                  - Most web browsers provide options for removing or rejecting cookies. You can
                  typically find instructions on how to manage cookies in your browser settings.
                  It’s important to note that many browsers accept cookies by default until you
                  modify your settings. However, disabling cookies may impact the proper functioning
                  of our Sites.
                </li>
                <li>
                  - For comprehensive information about cookies, including how to view the cookies
                  stored on your computer or mobile device and how to manage and delete them, you
                  can visit{' '}
                  <a
                    href="www.allaboutcookies.org"
                    target="_blank"
                    style={{ display: 'inline-block' }}
                  >
                    www.allaboutcookies.org
                  </a>
                  . If you choose not to accept our cookies, it may cause some inconvenience in your
                  use of our Sites. For instance, you may need to log in every time you visit, and
                  we may not be able to recognize your computer or mobile device.
                </li>
                <li>
                  - To opt out of receiving targeted advertising on websites, you can visit the
                  Network Advertising Initiative by clicking here or the Digital Advertising
                  Alliance by clicking here. European users can opt out of receiving targeted
                  advertising through the European Interactive Digital Advertising Alliance by
                  clicking here, selecting their country, and then clicking on “Choices” or a
                  similarly-titled link. Users of our mobile applications can opt out of receiving
                  targeted advertising in mobile apps through participating members of the Digital
                  Advertising Alliance by installing the AppChoices mobile app, available here, and
                  selecting their preferences. It’s worth noting that we may also collaborate with
                  companies that provide their own opt-out mechanisms, which may not be included in
                  the links provided above.
                </li>
                <li>
                  - If you decide to opt out of targeted advertisements, you will still encounter
                  online advertisements, although they may not be tailored to your interests. Please
                  be aware that not all companies engaged in online behavioral advertising are
                  listed in these opt-out mechanisms, so you may still receive cookies and
                  customized advertisements from companies not included in the list.
                </li>
                <li>
                  - For further details on how we collect, use, and share your information, please
                  refer to our Privacy Policy.
                </li>
                <li className="title">Changes</li>
                <li>
                  - Please check back frequently for any updates to the information on the cookies
                  we use because they may occasionally be changed.
                </li>
                <li className="title">Question</li>
                <li>
                  Please email us at help@themenuboss.com if you have any issues regarding our
                  cookie policy.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </PolicyLayout>
  );
};

export default PolicyPrivacy;
