import React from 'react';
import { Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';

import PolicyLayout from '@/components/Layout/Policy';

const PolicyService = () => {
  return (
    <PolicyLayout>
      <Typography
        fontSize={theme.fontSize.text24}
        fontWeight={theme.fontWeight.bold}
        color={theme.color.black}
      >
        Terms And Conditions
      </Typography>
      <ul className="policy-list">
        <li className="mt-24">
          THE FOLLOWING TERMS AND CONDITIONS (“TERMS”) OUTLINE THE PROVISIONS GOVERNING THE ACCESS
          AND USE OF THE MENUBOSS SIGNAGE SERVICE (“SERVICE”) PROVIDED BY KIMS GROUP USA
          (“MENUBOSS,” “US,” “WE,” “OUR”) THROUGH THE WEBSITE THEMENUBOSS.COM (“WEBSITE”). IT IS
          IMPORTANT THAT YOU CAREFULLY READ AND COMPREHEND THESE TERMS. BY CLICKING THE “SIGN UP”
          BUTTON, YOU CONFIRM THAT YOU UNDERSTAND AND ACCEPT THESE TERMS. IF YOU ARE ACCEPTING THESE
          TERMS ON BEHALF OF YOUR EMPLOYER OR AS AN EMPLOYEE, YOU CERTIFY THAT YOU HAVE THE
          AUTHORITY TO ENTER INTO LEGALLY BINDING CONTRACTS ON BEHALF OF YOUR EMPLOYER, AND THESE
          TERMS EQUALLY APPLY TO YOUR EMPLOYER. YOU ACKNOWLEDGE THAT THESE TERMS HOLD THE SAME
          ENFORCEABILITY AS A NEGOTIATED AGREEMENT SIGNED BY YOUR EMPLOYER. IF YOU DO NOT AGREE TO
          THESE TERMS, PLEASE DISCONTINUE USING THE SERVICE IMMEDIATELY. WE RECOMMEND THAT YOU PRINT
          AND RETAIN A COPY OF THESE TERMS FOR FUTURE REFERENCE.
        </li>
        <li>
          <ul>
            <li className="title mt-24">Definitions</li>
            <li>- “Billing Period” refers to the definition mentioned in clause 4.1.</li>
            <li>
              - “Contract” represents the agreement between us and you for the provision of the
              Service, incorporating these Terms, the Data Processing Schedule, the Service Level
              Agreement, and your online registration form.
            </li>
            <li>
              - “Content” encompasses all data, files, documents, multimedia files, third-party
              links, images, videos, and any other information or material (in any format) submitted
              by you or the Users to the Service.
            </li>
            <li>
              - “Data Processing Schedule” refers to the Data Processing Schedule outlined in
              Schedule 1 of these Terms.
            </li>
            <li>
              - “Fee” signifies the per Paired Screen fee that you are obligated to pay for
              utilizing the Service, as specified on the Website or agreed upon between us and you
              in writing.
            </li>
            <li>- “Free Trial” carries the meaning ascribed in clause 8.1.</li>
            <li>
              - “Hardware” pertains to your computer, laptop, or any other device used for accessing
              the Service.
            </li>
            <li>
              - “Intellectual Property Rights” include all intellectual property rights such as
              performer’s reproduction rights, performer’s distribution rights, performer’s rental
              rights, and performer’s lending rights (collectively known as “Performer’s Property
              Rights”), patents, utility models, trade and service marks, trade names, domain names,
              rights in designs, copyrights, moral rights, topography rights, rights in databases,
              trade secrets, know-how, and any similar or equivalent rights or forms of protection
              worldwide.
            </li>
            <li>
              - “Login Details” refer to the unique username and password required for all Users to
              access the Service.
            </li>
            <li>
              - “Minimum Requirements” denote the specified minimum specifications for your Hardware
              necessary to utilize the features and functionality of the Service, as stated on the
              Website periodically.
            </li>
            <li>
              - “Network” signifies the electronic communications network utilized by us to provide
              the Service.
            </li>
            <li>
              - “Pair” or “Paired” denotes a Screen that you have registered with the Service,
              enabling you to view your Content on the Screen using your Hardware.
            </li>
            <li>
              - “Purpose” signifies the act of using, copying, compressing, modifying, and
              transmitting the Content to provide you with the Service and fulfill our obligations
              under these Terms.
            </li>
            <li>
              - “Screen” represents any television, monitor, or other supported device through which
              the Service allows you to display your Paired Content using your Hardware.
            </li>
            <li>
              - “Service” refers to the digital signage service offered by us to you through the
              Website.
            </li>
            <li>
              - “Use” implies accessing the Service solely for your organization’s internal business
              purposes.
            </li>
            <li>
              - “User” denotes an individual employee of your organization who has been granted
              permission to use the Service and has been provided with the Login Details.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Information About MenuBoss And The Service</li>
            <li>
              2.1: The Service is specifically designed for commercial use. If you have the
              intention to utilize the Service for private, non-commercial purposes, we kindly
              request you to reach out to us via the email address specified in clause 16.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Registration</li>
            <li>
              3.1: To access and utilize the Service, you must complete the online registration form
              available on the Website. By completing this registration form, you give your consent
              for us to carry out verification and security procedures regarding the information
              provided.
            </li>
            <li>
              3.2: Once you have filled out and submitted the online registration form on the
              Website, you will receive a confirmation email (“Confirmation Email”) acknowledging
              your registration with us.
            </li>
            <li>
              3.3: You guarantee that the information provided by you is true, accurate, and
              complete. It is your responsibility to promptly notify us of any changes to the
              provided information.
            </li>
            <li>
              3.4: You are obligated to maintain the confidentiality and security of your Login
              Details, as well as ensure that all Users do the same. We retain the right to disable
              your Login Details and suspend your access to the Service, without prejudice to our
              other rights and remedies, if there are reasonable grounds to believe that any User
              has violated the provisions outlined herein.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Formation And Termination Of Your Contract</li>
            <li>
              4.1: The commencement of your Contract with us will be the date when we send you the
              Confirmation Email. The Contract will remain in effect during the Free Trial period
              and, unless terminated as outlined in clause 8, it will automatically renew for
              recurring periods of either one (1) month or one (1) year (referred to as a “Billing
              Period”), based on your selected option. This renewal will continue unless either
              party terminates the Contract in accordance with these Terms.
            </li>
            <li>
              4.2: You have the right to terminate your Contract at any time by providing written or
              email notice to the postal or email address specified in clause 16. The termination
              notice should expire at the end of the Free Trial or the relevant Billing Period (if
              applicable) in which we receive your termination notice. Please note that no refund of
              Fees paid will be provided in such circumstances.
            </li>
            <li>
              4.3: You may also terminate this Contract (by providing ten (10) days’ written or
              email notice to the postal or email address provided in clause 16) if we commit a
              significant breach of this Contract. In such cases, we will refund you a proportionate
              part of any prepaid Fees.
            </li>
            <li>
              4.4: We reserve the right to give you notice to terminate your Contract and your
              access to the Service at any time, with the termination becoming effective at the end
              of the current Billing Period.
            </li>
            <li>
              4.5: We may immediately suspend or terminate your access to the Service upon notice to
              you in the following circumstances:
            </li>
            <li>
              4.5.1: Third-party services and network providers cease to make their services or
              networks available to us.
            </li>
            <li>4.5.2: You fail to comply with one or more of these Terms.</li>
            <li>
              4.5.3: We have reason to believe there has been fraudulent use, misuse, or abuse of
              the Service’s features and functionalities (in whole or in part).
            </li>
            <li>
              4.5.4: We have reason to believe you have provided us with false, inaccurate, or
              misleading information. It is important to note that no Fees will be refunded in the
              event of termination by us in accordance with sections 4.5.2-4.5.4.
            </li>
            <li>
              4.6: Upon termination of your Contract in accordance with this clause 4, your and any
              User’s access to the Website and the Service will cease, and Content will no longer be
              accessible through the Service. We may retain copies of your Content and/or other data
              (including any User’s data) available through the Service for auditing, tax purposes,
              or as required by applicable law. Rest assured that these copies will always be kept
              confidential.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Access To The Service And Support</li>
            <li>
              5.1: In exchange for the payment of applicable Fees, we grant you a non-exclusive,
              non-transferable (without the right to sublicense) license to Use the Service for the
              duration of your Contract. This license also permits Users to Use the Service. You
              acknowledge that you are responsible for all Use of the Service by Users, and it is
              your responsibility to ensure that all Users are aware of and comply with these Terms.
              You will be held liable for any breach of these Terms by a User as if it were your own
              breach.
            </li>
            <li>
              5.2: The Service allows you and your Users to Pair Screens to view Content. While
              there is no limit to the number of Screens that can be Paired, we reserve the right to
              impose restrictions on the number of Screens you can have Paired at any given time,
              and we will notify you of such restrictions. You have the flexibility to Pair or
              unpair Screens as needed.
            </li>
            <li>
              5.3: We make reasonable efforts to ensure that the Service is available to you and the
              Users at all times. However, we cannot guarantee uninterrupted or fault-free service.
            </li>
            <li>
              5.4: Our ability to provide the Service may be affected by circumstances beyond our
              control, such as third-party service providers, geographical or atmospheric
              conditions, physical obstructions, software and hardware features of your computer,
              operating system, and the number of other users accessing the Service simultaneously.
              We will take reasonable measures to minimize disruptions caused by such circumstances,
              but you acknowledge and accept that some interruptions may be unavoidable.
            </li>
            <li>
              5.5: The Network is not under our control and may undergo upgrades, modifications,
              maintenance work, or other changes by the network owner. These circumstances may
              result in temporary unavailability of the Service. For more information on our Service
              Level Agreement, please refer to this link.
            </li>
            <li>
              5.6: We employ industry-standard security measures to protect the information, data,
              and content handled by our Service against loss, misuse, and alteration. However, you
              acknowledge and agree that we cannot guarantee the complete security of such
              information, data, and content, nor can we guarantee that our security measures will
              prevent unauthorized access or viewing of such information, data, and content.
              Nevertheless, we make reasonable efforts to prevent such actions and unauthorized
              access.
            </li>
            <li>
              5.7: We reserve the right to make changes to the Service or its components at our sole
              discretion. This includes updates, additions, removals, modifications, and variations
              of any features or functionalities of the Service. If significant changes are made to
              the Service that you are dissatisfied with, you have the right to terminate the
              Contract immediately.
            </li>
            <li>
              5.8: We offer support services for your Use of the Service throughout the duration of
              your Contract, available 24 hours a day, Monday to Friday (excluding UK and US bank
              and public holidays). These support services include:
            </li>
            <li>5.8.1: Advice on how to Use the Service.</li>
            <li>5.8.2: Diagnosis of Service interruptions (“Faults”).</li>
            <li>
              5.9: Fault diagnosis is contingent upon you or a User providing a clear and accurate
              description of the Fault requiring support. This description should include the
              circumstances in which the Fault occurred, the specific area of the Service affected
              by the Fault, and any other relevant information needed to address the Fault.
            </li>
            <li>
              5.10: Upon receiving a description in accordance with clause 5.9, we will make
              reasonable efforts to resolve the Faults within a reasonable timeframe, as specified
              in our Service Level Agreement.
            </li>
            <li>
              5.11: The support services outlined in this clause 5 do not cover the diagnosis and
              rectification of Faults resulting from:
            </li>
            <li>
              5.11.1: Use of the Service in a manner that does not comply with these Terms or using
              the Service for purposes it was not designed for.
            </li>
            <li>
              5.11.2: Faults caused by your or a third party’s software, hardware, network
              connections, applications, or any upgrades related to them.
            </li>
            <li>
              5.11.3: Faults resulting from equipment or other software that operates in conjunction
              with or integrates with the Service.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Your Obligations</li>
            <li>
              6.1: You acknowledge that you are solely responsible and liable for all activities on
              the Website and the Use of the Service, including the activities of your Users. You
              will be held liable for any breach of these Terms by a User as if you had committed
              the breach.
            </li>
            <li>
              6.2: You agree to promptly notify us in the event of a security breach or any
              unauthorized use of your Login Details.
            </li>
            <li>
              6.3: You are responsible for ensuring that any Content you submit is not offensive,
              illegal, inappropriate, or in violation of the following:
            </li>
            <li>
              6.3.1: It does not promote racism, bigotry, hatred, or physical harm towards any
              individual or group.
            </li>
            <li>6.3.2: It does not harass or advocate harassment of another person.</li>
            <li>6.3.3: It does not display pornographic or sexually explicit material.</li>
            <li>
              6.3.4: It does not promote abusive, threatening, obscene, defamatory, or libelous
              conduct.
            </li>
            <li>6.3.5: It does not promote illegal activities.</li>
            <li>
              6.3.6: It does not provide instructions for illegal activities, such as violating
              someone’s privacy or creating computer viruses.
            </li>
            <li>6.3.7: It does not contain inaccurate, false, or misleading information.</li>
            <li>
              6.3.8: It does not promote contests, sweepstakes, or pyramid schemes without our prior
              written consent.
            </li>
            <li>
              6.3.9: It does not contain any virus or other device that may disrupt or adversely
              affect the operation of the Website.
            </li>
            <li>
              6.3.10: It does not infringe upon any Intellectual Property Rights or other
              proprietary rights of third parties.
            </li>
            <li>
              6.4: Throughout the duration of the Contract, you grant us a non-exclusive, worldwide,
              royalty-free license to use the Content and other materials submitted by you or your
              Users solely for the Purpose.
            </li>
            <li>
              6.5: You acknowledge that the Service does not verify the rights and restrictions
              applicable to any Content. If you do not own the Content, you are responsible for
              verifying the relevant license rights and restrictions. We are not liable for any
              losses, damages, costs, or expenses incurred by you in relation to your use of any
              Content through the Service.
            </li>
            <li>
              6.6: You warrant and represent that you own, are licensed, or have the right to use
              all Intellectual Property Rights in the Content you submit to the Service. You agree
              to indemnify and hold us harmless against any damages, losses, costs, and expenses
              (including reasonable legal expenses) arising from any claim made against us by a
              third party related to our use or possession of the Content in accordance with these
              Terms.
            </li>
            <li>
              6.7: You agree to the following terms and ensure that your Users comply with them:
            </li>
            <li>
              6.7.1: Do not use Login Details with the intention of impersonating another
              individual.
            </li>
            <li>6.7.2: Do not allow anyone other than a User to use your Login Details.</li>
            <li>
              6.7.3: Do not engage in any activities that may impair, interfere with, damage, or
              cause harm or distress to anyone using the Service, the Website, or the Network.
            </li>
            <li>
              6.7.4: Do not use the Website and/or the Service in a way that infringes upon the
              intellectual property rights or other rights of any third parties.
            </li>
            <li>
              6.7.5: Use any information obtained through the Service and/or the Website only in
              accordance with these Terms.
            </li>
            <li>
              6.7.6: Comply with our instructions and policies regarding the Website and your Use of
              the Service.
            </li>
            <li>
              6.7.7: Cooperate with any reasonable security or mandatory legal checks or requests
              for information made by us.
            </li>
            <li>
              6.7.8: Use the information made available to you through the Service and the Website
              at your own risk.
            </li>
            <li>6.8: In the event that you or any User breaches any of the terms</li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Fees And Payment</li>
            <li>
              7.1: All Fees are invoiced in advance and are based on the number of Screens you have
              Paired at the beginning of the current Billing Period.
            </li>
            <li>
              7.2: If you decide to pair additional Screen(s) during a Billing Period, you will be
              required to pay additional Fees for those Screen(s). The additional Fees will be
              calculated on a pro-rata basis, considering the remaining duration of the Billing
              Period.
            </li>
            <li>
              7.3: There will be no reduction or refund of Fees if you unpair any Screen(s) during
              the Billing Period.
            </li>
            <li>7.4: Unless otherwise agreed in writing, all Fees are non-refundable.</li>
            <li>
              7.5: Any invoices issued are payable within thirty (30) days from the invoice date.
              Failure to make payment by the due date may result in access being withheld and/or
              termination of the Contract. If you wish to terminate the Contract, you must follow
              the procedure outlined in clause 4.
            </li>
            <li>
              7.6: We reserve the right to increase the Fees at any time by providing written
              notice. The increased Fees will take effect from the start of the next Billing Period
              following the notice. If you do not wish to accept the future Fee increase, you have
              the option to terminate the Contract before the next Billing Period begins.
            </li>
            <li>
              7.7: All Fees stated are exclusive of any applicable VAT or sales tax, which will be
              added at the applicable rate.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Free Trial</li>
            <li>
              8.1: We provide a one-time free trial of the Service for a specific period mentioned
              on the Website. During the Free Trial, certain restrictions and limited functionality
              may apply to the Service, such as a limit on the number of Screens that can be paired.
            </li>
            <li>
              8.2: Once the Free Trial expires, you have the option to either (i) continue accessing
              and using the Service by paying the applicable Fees, or (ii) discontinue access and
              use of the Service.
            </li>
            <li>
              8.3: If you participate in the Free Trial, you agree that we have the right to send
              you communications, notices, and news about the Service to the email address you
              provided, as well as any alternate email address you may have provided.
            </li>
            <li>
              8.4: We reserve the right to modify, cancel, or limit the Free Trial offer at any
              time.
            </li>
            <li>
              8.5: If you choose not to continue using the Service after the Free Trial period, you
              understand and agree that all Content will no longer be accessible through the Service
              upon the expiration of the Free Trial.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Fair Usage Policy</li>
            <li>
              9.1: You are allowed to pair one screen per license, unless you are using multiple
              screens in immediate proximity (referred to as a “video wall”), in which case they can
              be considered as one screen under the license. However, you need to have the necessary
              hardware for this setup. It is important to note that you are not permitted to split
              the signal from one device to power multiple screens that are not in immediate
              proximity without purchasing additional licenses for each screen.
            </li>
            <li>
              9.2: Our Broadcast and MenuBoss Dashboards features are designed and priced based on
              typical organizational usage. For example, continuous 24/7 broadcasting or displaying
              a large number of different dashboards in succession on a single screen would not be
              considered normal usage.
            </li>
            <li>
              9.3: If you are using Space-Based Billing and have accounts on different tiers, you
              are not allowed to use features and functionality that are exclusive to more expensive
              tiers unless the paired screen has a license for that specific tier.
            </li>
            <li>
              9.4: If we determine that you are using the service in a manner that exceeds the Fair
              Usage Policy, we will engage in discussion with you to find a resolution, which may
              involve applying additional fees.
            </li>
            <li>
              9.5: If you choose not to modify your usage or pay any additional fees after our
              communication regarding these Terms, you have the option to discontinue the Service
              and receive a pro-rata refund for the remaining time in your Billing Period.
            </li>
            <li>
              9.6: If we are unable to reach a resolution, we reserve the right to terminate your
              account in accordance with clause 4.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Exclusion Of Warranties And Limitation Of Liability</li>
            <li>
              10.1: You confirm that all users accessing the Service are at least 18 years old. You
              also affirm that you have the legal capacity to enter into and abide by these Terms.
              Moreover, you agree to adhere to all applicable laws regarding the use of the Service.
            </li>
            <li>
              10.2: The Service is intended for assisting with content viewing on screens and should
              not be relied upon as a backup solution. It is your responsibility to ensure you have
              adequate backup measures for your content. We will not be held liable for any losses
              or damages incurred due to your failure to implement sufficient backup provisions for
              your content.
            </li>
            <li>
              10.3: You acknowledge that we utilize compression techniques to transmit content on
              screens, which may result in a reduction in the quality of images when viewed. We
              cannot guarantee the successful pairing of screens, and it may be subject to specific
              requirements and specifications set by us.
            </li>
            <li>
              10.4: The Website may contain links to third-party websites. We hold no responsibility
              for the availability, suitability, reliability, or content of such third-party
              websites or software. Any utilization of third-party websites is undertaken at your
              own risk.
            </li>
            <li>
              10.5: We shall not be held liable for any delays or failures in providing the Service
              or making the Website accessible that are caused by third parties, including internet
              service providers, data centers, server hosting companies, and telecommunication
              providers.
            </li>
            <li>
              10.6: All warranties, representations, guarantees, conditions, and terms, whether
              expressed or implied, apart from those explicitly stated in these Terms, are fully
              excluded to the maximum extent permissible by law. Any information, advice,
              suggestions, or recommendations provided to you are provided on an “as is” basis.
            </li>
            <li>
              10.7: Nothing in these Terms excludes, restricts, or limits liability for death or
              personal injury resulting from negligence, fraud or fraudulent misrepresentation,
              willful default, any indemnity provided, or any liability that cannot be limited or
              excluded under applicable law.
            </li>
            <li>
              10.8: Except as provided in clause 10.7, neither you nor we shall be held accountable
              for any:
            </li>
            <li>10.8.1: Loss of profits, sales, business, or revenue.</li>
            <li>10.8.2: Loss or corruption of data, information, or software.</li>
            <li>10.8.3: Loss of business opportunity.</li>
            <li>10.8.4: Loss of anticipated savings.</li>
            <li>10.8.5: Loss of goodwill.</li>
            <li>
              10.8.6: Special, indirect, or consequential loss, whether resulting from negligence,
              failure to comply with these Terms, or any other cause.
            </li>
            <li>
              10.8.7: Subject to clause 10.7, the maximum combined liability of both parties in
              connection with this Contract, whether arising in contract, tort (including
              negligence), or otherwise, shall not exceed the fees paid by you to us under the
              Contract in the twelve (12) months prior to the month in which the event or series of
              events giving rise to the liability occurred. If less than 12 months have elapsed, the
              aggregate liability will be limited to the fees paid by you in the first 12 months of
              your Contract, calculated by averaging the fees paid (or payable) by you during the
              preceding months.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Intellectual Property Rights</li>
            <li>
              11.1: We and/or our licensors possess all rights to the intellectual property related
              to the Service and the Website. Despite the limited license granted in clause 5.1, we
              retain exclusive ownership of and all rights to the Service and the Website, along
              with our licensors, and we reserve all rights associated with them.
            </li>
            <li>11.2: You are explicitly prohibited from:</li>
            <li>
              11.2.1: Reproducing, copying, modifying, transmitting, uploading, or integrating any
              part of the Service or the Website into other materials.
            </li>
            <li>
              11.2.2: Removing, altering, or using any registered or unregistered marks, logos, or
              designs owned by us and/or our licensors. You must refrain from engaging in any
              activity that may exploit our reputation and goodwill or infringe upon the
              intellectual property rights owned or licensed to us.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Data Protection</li>
            <li>
              12.1: Both parties, we and you, commit to fulfilling our respective obligations as
              outlined in the Data Processing Schedule 1.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Viruses, Hacking And Other Offences</li>
            <li>
              13.1: You agree not to misuse the Website by knowingly introducing harmful material
              such as viruses, trojans, worms, logic bombs, or engaging in any malicious or harmful
              activities. Unauthorized access attempts to the Website, its server, or any connected
              servers, computers, or databases are strictly prohibited. Any attempts to disrupt the
              Website through denial-of-service attacks or similar methods are also prohibited.
            </li>
            <li>
              13.2: It is important to note that breaching this provision would constitute a
              criminal offense under the Computer Misuse Act 1990. In such cases, we will report the
              breach to the relevant law enforcement authorities and cooperate by providing them
              with your identity. If a breach occurs, your right, as well as any User’s right, to
              use the Website will be terminated immediately.
            </li>
            <li>
              13.3: We are not liable for any loss or damage resulting from distributed
              denial-of-service attacks, viruses, or other harmful material that may infect your
              computer equipment, software, data, or other proprietary material as a result of your
              or any User’s use of the Website. This includes downloading material from the Website
              or any linked websites.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Publicity And Marketing</li>
            <li>
              14.1: With your written approval, we may mention you as our customer and describe the
              services we have provided to you in our marketing materials.
            </li>
            <li>
              14.2: With your written approval, we may create and share a case study that showcases
              the Service we have provided to you. This case study may include aggregated
              information about your usage of the Service and the positive impact it has had on your
              business. It will be used as a marketing tool by us.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Confidentiality</li>
            <li>
              15.1: Each party (referred to as the “Receiving Party”) agrees to keep all information
              and documents disclosed by the other party (referred to as the “Disclosing Party”)
              confidential. This includes any information related to operations, products,
              processes, trade secrets, or the business of the Disclosing Party, as well as any
              information identified as confidential by the Disclosing Party. The Receiving Party
              will only use the Confidential Information for the purpose of fulfilling its
              obligations under these Terms or, in the case of MenuBoss, for improving the
              performance of the Service. The Receiving Party will not disclose Confidential
              Information to any third party without the prior written consent of the Disclosing
              Party, except to its employees, affiliates, and subcontractors as reasonably necessary
              for performing its obligations under these Terms.
            </li>
            <li>
              15.2: The obligations stated in Clause 14.1 do not apply to Confidential Information
              that:
            </li>
            <li>
              15.2.1 is already in the public domain on or after the effective date of the Contract,
              without any breach of these Terms by the Receiving Party;
            </li>
            <li>
              15.2.2 is provided to the Receiving Party without any restrictions by a third party
              with the right to do so;
            </li>
            <li>
              15.2.3 must be disclosed by the Receiving Party due to legal or regulatory
              requirements of a marketplace or stock exchange. However, the Receiving Party will
              provide the Disclosing Party with as much notice as reasonably possible before making
              such a disclosure.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">General</li>
            <li>
              16.1: If we do not enforce strict compliance with our obligations under these Terms,
              or if we do not exercise any of our rights or remedies, it does not mean we waive
              those rights or remedies, and it does not relieve you from fulfilling your
              obligations.
            </li>
            <li>
              16.2: You must comply with all applicable foreign and local laws and regulations when
              using the Website, including export control laws and regulations, regardless of your
              physical location.
            </li>
            <li>
              16.3: Neither party will be held responsible for delays caused by circumstances beyond
              their reasonable control. However, the non-performing party will make reasonable
              efforts to overcome such causes and continue performance as promptly as possible once
              the causes are resolved.
            </li>
            <li>16.4: Waiving a default by us does not mean we waive any subsequent defaults.</li>
            <li>
              16.5: Any waiver of the Terms by us must be expressly stated in writing to be
              effective.
            </li>
            <li>
              16.6: All notifications and communications should be sent to the contact details
              provided in clause 16 (for MenuBoss) or the contact details you provided during the
              online registration process. Notices or communications are considered delivered: (i)
              if delivered in person, when left at the recipient’s address; (ii) if sent by post,
              two working days after being posted; (iii) if sent by email, upon completion of
              transmission.
            </li>
            <li>
              16.7: If any of these Terms are deemed invalid, unlawful, or unenforceable by a
              competent authority to any extent, that particular term or provision will be severed
              from the remaining terms, conditions, and provisions, which will continue to be valid
              to the fullest extent permitted by law.
            </li>
            <li>
              16.8: Your Contract with us represents the entire agreement between you and us
              regarding your use of the Website, superseding any prior agreements, understandings,
              or arrangements, whether oral or written.
            </li>
            <li>
              16.9: By entering into these Terms, you acknowledge that you have not relied on any
              representations, undertakings, or promises made orally or in writing, except as
              expressly stated in these Terms.
            </li>
            <li>
              16.10: These Terms are governed by and interpreted in accordance with English law. The
              English courts have exclusive jurisdiction over any disputes arising from these Terms.
            </li>
            <li>
              16.11: We may make minor amendments to these Terms by providing reasonable notice on
              our Website. By continuing to use the Service after the notice period expires, you
              will be deemed to have accepted any amendments. For significant changes, we will
              notify existing customers by email.
            </li>
            <li>
              16.12: Unless explicitly stated otherwise, this Contract does not grant any rights
              under the Contracts (Rights of Third Parties) Act 1999 to enforce any term of this
              Contract. The rights of the parties to rescind or modify this Contract are not subject
              to the consent of any other person.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Contact Details</li>
            <li>
              17.1: If you have any inquiries or questions regarding these terms, please contact us
              at help@themenuboss.com.
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Schedule 1</li>
            <li>Data Processing Schedule</li>
            <li>1. INTERPRETATION AND APPLICATION</li>
            <li>
              1.1. In this Data Processing Schedule, the following terms have the meanings set out
              in this Paragraph 1.1, unless expressly stated otherwise:
            </li>
            <li>
              <ul>
                <li>
                  (a) “Adequate Country” refers to a country or territory outside the European
                  Economic Area that the European Commission has determined to provide an adequate
                  level of protection for Personal Data, in accordance with Article 45(1) of the
                  GDPR.
                </li>
                <li>
                  (b) “Anonymised Data” refers to any Personal Data (including Customer Personal
                  Data) that has been anonymised in such a way that it cannot directly or indirectly
                  identify the Data Subject to whom it relates, as reasonably determined by MenuBoss
                  or any other party likely to receive or access such anonymised Personal Data.
                </li>
                <li>
                  (c) “Business Day” means any day other than a Saturday, Sunday, or public holiday
                  on which banks are open for business in London.
                </li>
                <li>(d) “Cessation Date” has the meaning described in Paragraph 9.1.</li>
                <li>
                  (e) “Controller Data” refers to any Personal Data related to Users or other
                  Customer personnel that MenuBoss processes, except for the purpose of providing
                  support services under the Contract, in accordance with the MenuBoss Privacy
                  Policy available at{' '}
                  <a
                    href="https://www.themenuboss.com."
                    target="_blank"
                    style={{ display: 'inline-block' }}
                    rel="noreferrer"
                  >
                    https://www.themenuboss.com.
                  </a>
                </li>
                <li>
                  (f) “Customer Personal Data” means any Personal Data contained in any Content and
                  any other Personal Data related to Users that MenuBoss processes on behalf of
                  Customer while providing support services under the Contract (excluding any
                  Controller Data).
                </li>
                <li>
                  (g) “Data Protection Laws” refers to the EU General Data Protection Regulation
                  2016/679 (GDPR) and any applicable implementing legislation or legislation having
                  equivalent effect in the United Kingdom. References to “Articles” or “Chapters” of
                  the GDPR, as well as any definitions therein, are interpreted accordingly.
                </li>
                <li>
                  (h) “Data Subject Request” refers to the exercise of Data Subjects’ rights under
                  Chapter III of the GDPR, in accordance with the provisions therein.
                </li>
                <li>
                  (i) “Data Subject” refers to the identified or identifiable natural person located
                  in the European Economic Area to whom Customer Personal Data relates.
                </li>
                <li>
                  (j) “Delete” means to permanently remove or erase Personal Data in such a way that
                  it cannot be recovered or reconstructed. “Deletion” is understood accordingly.
                </li>
                <li>
                  (k) “Post-cessation Storage Period” has the meaning described in Paragraph 9.2.
                </li>
                <li>
                  (l) “Restricted Country” refers to a country or territory outside the European
                  Economic Area that is not considered an Adequate Country.
                </li>
                <li>
                  (m) “Restricted Transfer” refers to: (i) the transfer of Customer Personal Data
                  from Customer to MenuBoss in a Restricted Country; or (ii) the onward transfer of
                  Customer Personal Data from MenuBoss to a Subprocessor in a Restricted Country.
                  Such transfers would be prohibited by Data Protection Laws without a legal basis
                  under Chapter V of the GDPR.
                </li>
                <li>
                  (n) “Services” refers to the services and activities to be provided or carried out
                  by MenuBoss for Customer, as stated in the Contract.
                </li>
                <li>
                  (o) “Standard Contractual Clauses” refers to the standard contractual clauses
                  issued by the European Commission (from time to time) for the transfer of Personal
                  Data from Data Controllers established inside the European Economic Area to Data
                  Processors established in Restricted Countries.
                </li>
                <li>
                  (p) “Subprocessor” refers to any third party appointed by or on behalf of MenuBoss
                  to process Customer Personal Data.
                </li>
              </ul>
            </li>
            <li>1.2. In this Data Processing Schedule:</li>
            <li>
              <ul>
                <li>
                  (a) The terms “Data Controller,” “Data Processor,” “Personal Data,” “Personal Data
                  Breach,” “Process” (and its derivatives), and “Supervisory Authority” have the
                  meanings ascribed to them in the Data Protection Laws.
                </li>
                <li>
                  (b) Unless otherwise defined in this Data Processing Schedule, all capitalized
                  terms have the meanings given to them in the Terms.
                </li>
              </ul>
            </li>
            <li>1.3. Customer warrants and represents that</li>
          </ul>
        </li>
        <li>
          <ul>
            <li className="title">Processing Of Customer Personal Data</li>
            <li>2.1. In relation to Customer Personal Data:</li>
            <li>
              <ul>
                <li>(a) MenuBoss is acting as a Data Processor.</li>
                <li>(b) Customer is acting as the Data Controller.</li>
              </ul>
            </li>
            <li>2.2. MenuBoss agrees to:</li>
            <li>
              <ul>
                <li>
                  (a) comply with all relevant Data Protection Laws when processing Customer
                  Personal Data.
                </li>
                <li>
                  (b) only process Customer Personal Data in accordance with Customer’s instructions
                  (subject to Paragraph 2.9) and as required by applicable laws.
                </li>
              </ul>
            </li>
            <li>2.3. Where permitted by applicable laws, MenuBoss will inform Customer about:</li>
            <li>
              <ul>
                <li>(a) any Processing carried out under Paragraph 2.2(b)(ii).</li>
                <li>
                  (b) the legal requirements that necessitate such Processing of Customer Personal
                  Data, before the Processing takes place.
                </li>
              </ul>
            </li>
            <li>
              2.4. Customer instructs MenuBoss to Process Customer Personal Data as necessary:
            </li>
            <li>
              <ul>
                <li>(a) to provide the Services to Customer.</li>
                <li>
                  (b) to fulfill MenuBoss’s obligations and exercise MenuBoss’s rights under the
                  Contract.
                </li>
              </ul>
            </li>
            <li>
              2.5. Annex 1 (Data Processing Details) provides specific information about MenuBoss’s
              Processing of Customer Personal Data, as required by Article 28(3) of the GDPR.
            </li>
            <li>
              2.6. Customer may modify Annex 1 (Data Processing Details) by providing written notice
              to MenuBoss when necessary to comply with applicable Data Protection Laws.
            </li>
            <li>
              2.7. Nothing in Annex 1 confers any rights or imposes any obligations on the Parties
              to this Data Processing Schedule.
            </li>
            <li>
              2.8. If MenuBoss receives an instruction from Customer that, in its reasonable
              opinion, violates the GDPR, MenuBoss will notify Customer.
            </li>
            <li>
              2.9. Customer acknowledges that any instructions issued to MenuBoss regarding the
              Processing of Customer Personal Data:
            </li>
            <li>
              <ul>
                <li>
                  (a) must be strictly necessary to ensure compliance with Data Protection Laws.
                </li>
                <li>
                  (b) must not materially alter the scope of the Services provided by MenuBoss under
                  the Contract.
                </li>
              </ul>
            </li>
            <li>
              2.10. MenuBoss may terminate the entire Contract with immediate effect by providing
              written notice to Customer if, at its reasonable discretion:
            </li>
            <li>
              <ul>
                <li>
                  (a) MenuBoss is unable to comply with or implement any instructions from the
                  Customer due to technical limitations of its systems, equipment, or facilities.
                </li>
                <li>
                  (b) complying with or implementing such instructions would require
                  disproportionate effort in terms of time, cost, technology, manpower, or other
                  factors.
                </li>
              </ul>
            </li>
            <li>
              2.11. Customer warrants that, for the purposes of Article 6 of the GDPR, and where
              applicable, Article 9 and/or Article 10 of the GDPR, there is a valid legal basis for
              MenuBoss’s Processing of Customer Personal Data throughout the term of the Contract,
              in accordance with the Contract and any instructions issued by Customer regarding such
              Processing.
            </li>
          </ul>
        </li>
        <li className="title mt-24">3. MENUBOSS PERSONNEL</li>
        <li>
          MenuBoss will take reasonable measures to ensure the reliability of any MenuBoss Personnel
          involved in Processing Customer Personal Data. MenuBoss will ensure that such personnel
          are bound by confidentiality obligations or subject to professional or statutory
          obligations of confidentiality.
        </li>
        <li className="title mt-24">4. SECURITY</li>
        <li>
          <ul>
            <li>
              4.1. Considering the latest advancements, implementation costs, and the nature, scope,
              context, and purposes of Processing, as well as the varying likelihood and severity of
              risks to the rights and freedoms of individuals, MenuBoss is obligated to employ
              appropriate technical and organizational measures to ensure a level of security that
              aligns with the associated risks. These measures should encompass those mentioned in
              Article 32(1) of the GDPR when deemed suitable.
            </li>
            <li>
              4.2. When assessing the suitable level of security, MenuBoss should particularly
              consider the risks associated with the Processing, especially those stemming from a
              Personal Data Breach.
            </li>
          </ul>
        </li>
        <li className="title mt-24">5. SUBPROCESSING</li>
        <li>
          <ul>
            <li>
              5.1. Customer grants MenuBoss the authority to appoint Subprocessors as outlined in
              this Paragraph 5.
            </li>
            <li>
              5.2. MenuBoss may continue utilizing Subprocessors already engaged before the
              effective date of this Data Processing Schedule, provided that MenuBoss fulfills or
              has already fulfilled the obligations specified in Paragraph 5.3 within a reasonable
              timeframe.
            </li>
            <li>
              5.3. MenuBoss will strive to ensure that its arrangement with each Subprocessor is
              governed by a written contract containing terms that provide a level of protection for
              Customer Personal Data equivalent to those outlined in this Data Processing Schedule,
              including those mentioned in Paragraph 4.
            </li>
          </ul>
        </li>
        <li className="title mt-24">6. DATA SUBJECT RIGHTS</li>
        <li>
          <ul>
            <li>
              6.1. Considering the nature of the Processing, MenuBoss will provide Customer with
              reasonable and technically feasible assistance to fulfill its obligations in
              responding to Data Subject Requests.
            </li>
            <li>6.2. MenuBoss shall:</li>
            <li>
              <ul>
                <li>(a) promptly notify Customer upon receiving a Data Subject Request, and</li>
                <li>
                  (b) refrain from responding to any Data Subject Request except upon Customer’s
                  written instructions (and in such cases, at Customer’s expense) or as required by
                  applicable laws.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="title mt-24">7. PERSONAL DATA BREACH</li>
        <li>
          <ul>
            <li>
              7.1. MenuBoss shall promptly notify Customer upon becoming aware of a Personal Data
              Breach that affects Customer Personal Data. The notification shall include sufficient
              information (to the extent available to MenuBoss at that time) to enable Customer to
              fulfill its obligations under Data Protection Laws, such as reporting the Personal
              Data Breach to:
            </li>
            <li>
              <ul>
                <li>(a) affected Data Subjects, or</li>
                <li>
                  (b) the relevant Supervisory Authority(ies) (as determined in accordance with Data
                  Protection Laws).
                </li>
              </ul>
            </li>
            <li>
              7.2. MenuBoss shall cooperate with Customer, at Customer’s expense, and take
              reasonable commercial steps directed by Customer to assist in investigating,
              mitigating, and remedying each Personal Data Breach.
            </li>
          </ul>
        </li>
        <li className="title mt-24">8. DATA PROTECTION IMPACT ASSESSMENT AND PRIOR CONSULTATION</li>
        <li>
          <ul>
            <li>
              8.1. MenuBoss shall reasonably assist Customer, at Customer’s expense, with any
              necessary data protection impact assessments and prior consultations with Supervisory
              Authorities. This assistance should consider the Processing of Customer Personal Data,
              the nature of the Processing, and the available information to MenuBoss.
            </li>
          </ul>
        </li>
        <li className="title mt-24">9. DELETION OR RETURN OBLIGATIONS</li>
        <li>
          <ul>
            <li>
              9.1. Upon the termination of any Services involving the Processing of Customer
              Personal Data (the “Cessation Date”), MenuBoss shall immediately cease all Processing
              of Customer Personal Data for any purpose except storage.
            </li>
            <li>
              9.2. To the extent technically feasible (as determined solely by MenuBoss), upon
              written request made no later than fifteen (15) Business Days after the Cessation Date
              (“Post-cessation Storage Period”), MenuBoss shall:
            </li>
            <li>
              <ul>
                <li>
                  (a) securely transfer and either remove or return a complete copy of all Customer
                  Personal Data within its possession to Customer, promptly deleting all other
                  copies, or
                </li>
                <li>(b) delete all Customer Personal Data within its possession.</li>
              </ul>
            </li>
            <li>
              9.3. MenuBoss shall comply with any written request pursuant to Paragraph 9.2 within
              fifteen (15) Business Days of the Cessation Date.
            </li>
            <li>
              9.4. If, during the Post-cessation Storage Period, Customer fails to provide written
              instructions to MenuBoss regarding the deletion or return of Customer Personal Data as
              stated in Paragraph 9.2, MenuBoss will, after the Post-cessation Storage Period
              expires, promptly take one of the following actions at its discretion:
            </li>
            <li>
              <ul>
                <li>(a) Delete the Customer Personal Data; or</li>
                <li>
                  (b) Utilize the fullest extent of technically feasible measures to render the
                  Customer Personal Data irreversibly anonymous.
                </li>
              </ul>
            </li>
            <li>
              9.5. MenuBoss and any Subprocessor may retain Customer Personal Data as required by
              applicable law, for the duration mandated by applicable law. However, MenuBoss and any
              Subprocessor shall ensure the following:
            </li>
            <li>
              <ul>
                <li>(c) Maintain the confidentiality of all Customer Personal Data.</li>
                <li>
                  (d) Process the Customer’s Personal Data solely for the purpose(s) specified in
                  the relevant law that necessitates its retention and for no other purpose.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="title mt-24">10. AUDIT RIGHTS</li>
        <li>
          <ul>
            <li>
              10.1. Upon request, MenuBoss will provide Customer with the necessary information to
              demonstrate compliance with this Data Processing Schedule, as reasonably determined by
              MenuBoss.
            </li>
            <li>
              10.2. Unless specified otherwise in Paragraphs 10.3 and 10.4, if Customer (acting
              reasonably) presents documentary evidence that the information provided by MenuBoss in
              accordance with Paragraph 10.1 is insufficient to demonstrate compliance with this
              Data Processing Schedule, MenuBoss shall facilitate and participate in audits,
              including on-premise inspections, conducted by Customer or an auditor appointed by
              Customer, concerning the Processing of Customer Personal Data by MenuBoss.
            </li>
            <li>
              10.3. Customer shall provide MenuBoss with reasonable notice before conducting any
              audit or inspection as described in Paragraph 10.1. The notice period should not be
              less than fifteen (15) business days, unless mandated otherwise by a Supervisory
              Authority pursuant to Paragraph 9.4(f). Customer shall make best efforts to prevent
              any damage, injury, or disruption to MenuBoss’s premises, equipment, personnel, data,
              and business (including any compromise of confidentiality or security of data
              belonging to MenuBoss other customers or the availability of MenuBoss’s services to
              those customers) while conducting on-premise inspections. Customer hereby indemnifies
              MenuBoss against any such damage, injury, or disruption.
            </li>
            <li>
              10.4. MenuBoss is not obligated to grant access to its premises for the purpose of an
              audit or inspection under the following conditions:
            </li>
            <li>
              <ul>
                <li>
                  (a) When an individual fails to provide reasonable evidence of identity and
                  authority.
                </li>
                <li>
                  (b) When an auditor has not obtained prior written approval from MenuBoss (which
                  will not be unreasonably withheld).
                </li>
                <li>
                  (c) Unless the auditor enters into an acceptable non-disclosure agreement with
                  MenuBoss.
                </li>
                <li>
                  (d) If MenuBoss, acting reasonably, believes that granting access would compromise
                  the confidentiality or security of data belonging to MenuBoss’s other customers or
                  the availability of MenuBoss’s services to those customers.
                </li>
                <li>(e) during non-business hours at those premises; or</li>
                <li>
                  (f) on multiple occasions within a calendar year during the Agreement’s term,
                  excluding any additional audits or inspections required by Data Protection Law or
                  a Supervisory Authority. In such cases, the Customer must inform the Supplier of
                  the audit or inspection requirement.
                </li>
              </ul>
            </li>
            <li>
              10.5. The Customer is responsible for any third-party costs associated with
              inspections or audits. The Customer must reimburse MenuBoss for all expenses and time
              spent by MenuBoss (at MenuBoss’s prevailing professional services rates) related to
              these inspections or audits.
            </li>
          </ul>
        </li>
        <li className="title mt-24">11. RESTRICTED TRANSFERS</li>
        <li>
          <ul>
            <li>
              11.1. Unless stated in Paragraph 11.3, if MenuBoss or any Subprocessor processes
              Customer Personal Data involving a Restricted Transfer, the Parties agree that:
            </li>
            <li>
              <ul>
                <li>(a) The Customer acts as the “data exporter”; and</li>
                <li>(b) MenuBoss or the Subprocessor acts as the “data importer”.</li>
                <li>
                  They must enter into the Standard Contractual Clauses for that Restricted Transfer
                  and the associated Processing in accordance with Paragraph 11.3.
                </li>
              </ul>
            </li>
            <li>
              11.2. Regarding any Standard Contractual Clauses agreed upon in accordance with
              Paragraph 11.1:
            </li>
            <li>
              <ul>
                <li>
                  (a) Clause 9 of the Standard Contractual Clauses should include the following
                  information:
                </li>
                <li>
                  “The Clauses shall be governed by the law of the Member State where the data
                  exporter is established.”
                </li>
                <li>
                  (b) Clause 11(3) of the Standard Contractual Clauses should include the following
                  information:
                </li>
                <li>
                  “The provisions concerning data protection aspects for sub-processing of the
                  contract referred to in paragraph 1 shall be governed by the law of the Member
                  State where the data exporter is established.”
                </li>
                <li>
                  (c) Appendix 1 of the Standard Contractual Clauses should include the
                  corresponding information provided in Annex 1 (Data Processing Details); and
                </li>
                <li>
                  (d) Appendix 2 of the Standard Contractual Clauses should include the following
                  information:
                </li>
                <li>
                  “The technical and organizational security measures implemented by the data
                  importer in accordance with Clauses 4(d) and 5(c) are those established and
                  maintained under Paragraph 4 of the Data Processing Schedule.”
                </li>
              </ul>
            </li>
            <li>
              11.3. The Standard Contractual Clauses will automatically take effect under Paragraph
              11.1 when the relevant Restricted Transfer begins. However, Paragraph 11.1 does not
              apply to a Restricted Transfer if it would result in a breach of applicable Data
              Protection Laws.
            </li>
            <li>
              11.4. In relation to any Standard Contractual Clauses agreed upon with a Subprocessor
              under Section 10.1, the Customer appoints MenuBoss as its agent solely for the purpose
              of enabling MenuBoss to enter into those Standard Contractual Clauses on the
              Customer’s behalf.
            </li>
          </ul>
        </li>
        <li className="title mt-24">12. ANONYMOUS DATA</li>
        <li>
          The Customer acknowledges and agrees that MenuBoss has the freedom to use and disclose
          Anonymised Data for its own business purposes without any limitations.
        </li>
        <li className="title mt-24">13. NO SPECIAL CATEGORIES OF PERSONAL DATA</li>
        <li>
          <ul>
            <li>
              13.1. The Customer guarantees and assures, on an ongoing basis, that it will not (and
              will ensure that its personnel will not) cause MenuBoss or its subprocessors to
              process any:
            </li>
            <li>
              <ul>
                <li>
                  (a) Special Categories of Personal Data mentioned in Article 9(1) of the GDPR; or
                </li>
                <li>(b) Personal Data related to criminal convictions or offenses.</li>
              </ul>
            </li>
            <li>
              13.2. The Customer will indemnify and hold MenuBoss, its employees, officers,
              directors, and agents harmless from any liabilities, losses, damages, costs, fines,
              and other expenses (including legal costs and fees) arising from or related to any
              breach of this Paragraph 13 by the Customer.
            </li>
            <li>
              13.3. The limitations on liability stated in the Contract do not apply to liability
              arising from or in connection with the indemnity mentioned in Paragraph 13.2.
            </li>
          </ul>
        </li>
        <li className="title mt-24">14. CHANGE IN LAWS</li>
        <li>
          <ul>
            <li>
              14.1. In the event of a change in the Data Protection Laws that MenuBoss reasonably
              determines would prevent it from fulfilling its obligations under Data Protection
              Laws, including providing the Services (including any Processing and/or Restricted
              Transfer(s) of Customer Personal Data), MenuBoss reserves the right to modify the
              Services and amend any part of this Data Processing Schedule reasonably necessary to
              ensure compliance with Data Protection Laws.
            </li>
            <li>
              14.2. If the Customer reasonably believes that the changes made to the Services and/or
              this Data Processing Schedule under Paragraph 14.1 will cause significant and
              irreparable harm, the Customer may terminate the Contract entirely by providing
              written notice to MenuBoss with immediate effect.
            </li>
          </ul>
        </li>
        <li className="title mt-24">15. CONTROLLER DATA</li>
        <li>
          <ul>
            <li>
              15.1. The Customer acknowledges and agrees that, between the Parties, MenuBoss has the
              unrestricted ability to use and disclose the Controller Data for any purposes
              determined solely by MenuBoss.
            </li>
            <li>
              15.2. Insofar as any Controller Data qualifies as Personal Data under Data Protection
              Laws, MenuBoss:
            </li>
            <li>
              <ul>
                <li>(a) Acts as an independent Data Controller regarding such Controller Data;</li>
                <li>
                  (b) Has the independent authority to determine the purposes and methods of
                  processing for such Controller Data.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="title mt-24">16. ORDER OF PRECEDENCE</li>
        <li>
          <ul>
            <li>16.1. This Data Processing Schedule is an integral part of the Contract.</li>
            <li>16.2. In case of any conflict or inconsistency:</li>
            <li>
              <ul>
                <li>
                  (a) between this Data Processing Schedule and the Terms or the Service Level
                  Agreement, this Data Processing Schedule shall take precedence; or
                </li>
                <li>
                  (b) between any Standard Contractual Clauses entered into under Paragraph 11 and
                  this Data Processing Schedule, the Standard Contractual Clauses shall take
                  precedence.
                </li>
                <li>Annex 1 Data Processing Details</li>
                <li>
                  This Annex 1 provides specific information regarding the Processing of Customer
                  Personal Data, as required by Article 28(3) of the GDPR. It also serves to
                  populate Appendix 1 of the Standard Contractual Clauses, where applicable under
                  Paragraph 11.
                </li>
                <li>MenuBoss’s activities</li>
                <li>- Billing, Marketing, User Registration, Authentication, and Authorization.</li>
                <li>Subject matter and duration of the Processing of Customer Personal Data</li>
                <li>
                  The subject matter and duration of the Processing of Customer Personal Data are
                  outlined in the Terms and the Data Processing Schedule.
                </li>
                <li>Nature and purpose of the Processing of Customer Personal Data</li>
                <li>
                  - Billing, Marketing, User Registration, Authentication, and Authorization carried
                  out during the provision of Services to the Customer.
                </li>
                <li>Types of Customer Personal Data to be Processed</li>
                <li>
                  - Personal Data: Any Personal Data included in the Content and any other Personal
                  Data of Users processed by or on behalf of MenuBoss for the Customer’s support
                  services under the Contract (excluding any Controller Data).
                </li>
                <li>- Special Categories of Personal Data (if any): None.</li>
                <li>Categories of Data Subjects to whom the Customer Personal Data relates</li>
                <li>- Data Subjects whose Personal Data is included in the Content.</li>
                <li>- Users of the Service.</li>
                <li>Obligations and rights of the Customer</li>
                <li>
                  The obligations and rights of the Customer are detailed in the Terms and the Data
                  Processing Schedule.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </PolicyLayout>
  );
};

export default PolicyService;
