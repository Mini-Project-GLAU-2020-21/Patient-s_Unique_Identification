import React from 'react';
import Base from "../core/Base";

const PatientDashboard = () => {
    return(
        <Base title="Welcome to Patient's Unique Identification" description="Stay Healthy, Stay Safe">
            <div className="card mb-4 px-5">
                <h3 className="card-header text-center container mb-5">Coronavirus disease (COVID-19) advice for the public: When and how to use 
                masks</h3>
            <h2 className="mb-4">Masks overview</h2>
            <p>If COVID-19 is spreading in your community, stay safe by taking some simple precautions, such as physical 
                distancing, wearing a mask, keeping rooms well ventilated, avoiding crowds, cleaning your hands, and 
                coughing into a bent elbow or tissue. Check local advice where you live and work. <b>Do it all!</b></p>
                <p><b>Make wearing a mask a normal part of being around other people.</b></p>

                <p>Masks should be used as part of a comprehensive strategy of measures to suppress transmission and save 
                    lives; the use of a mask alone is not sufficient to provide an adequate level of protection against 
                    COVID-19</p>

                <p>Here are the basics of how to wear a mask:</p>
                <ul>
                    <li>Clean your hands before you put your mask on, as well as before and after you take it off.</li>
                    <li>Make sure it covers both your nose, mouth and chin. </li>
                </ul>
                <p>Here are some specifics on what type of mask to wear and when, depending on how much virus is 
                   circulating where you live, where you go and who you are.</p>
                <ul>
                <li>Wear a fabric mask unless you’re in a particular risk group. This is especially important when you 
                    can’t stay physically distanced, particularly in crowded and poorly ventilated indoor settings.</li>
                <li>Wear a medical/surgical mask if you:</li>
                    <ul>
                <li>Are over 60,</li>
                <li>Have underlying medical conditions</li>
                <li>Are feeling unwell, and/or</li></ul>
                <li>Are looking after an ill family member.</li>
</ul>

<p>For health workers, medical masks are essential personal protective equipment when engaging with patients with suspected, probable or confirmed COVID-19. Respirator masks (such as FFP2, FFP3, N95, N99) should be used in settings where procedures generating aerosols are performed and must be fitted to ensure the right size is worn.
            </p><br /><br />
            <p>
                <table cellPadding="25px" className="text-center">
                    <tr>
                        <td>
                            <h3>WHO’s recommended fabric mask materials</h3>
                        </td>
                        
                        <td>
                            <h3>Medical and fabric masks: who wears what mask when?</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/iYE0A-5wd14" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </td>
                        
                        <td>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/esM_ePHn0aw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        </td>
                    </tr>
                    <br /><br />
                    <tr>
                        <td>
                            <h3>How to wear a fabric mask</h3>
                        </td>
                        
                        <td>
                            <h3>How to wear a medical mask?</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/ciUniZGD4tY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </td>
                        
                        <td>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/adB8RW4I3o4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        </td>
                    </tr>
                </table>
            </p>
        </div>
        </Base>
    );

};

export default PatientDashboard;