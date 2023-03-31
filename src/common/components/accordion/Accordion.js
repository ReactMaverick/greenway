import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatListSlider } from "react-native-flatlist-slider";
import { BKColor } from "../../values/BKColor";
import { fontSize } from "../../values/BKStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

function Accordion({ heading, details }) {
    const [activeAccordion, setActiveAccordion] = useState(false);
    return (
        <View>
            {activeAccordion ?
                <>
                    <TouchableOpacity onPress={()=>{setActiveAccordion(false)}} style={styles.faqAccordionSecActive}>
                        <Text style={styles.faqAccordionSecActive.faqAccordionText}>{heading}</Text>
                        <Entypo name="chevron-up" color={BKColor.textColor1} size={fontSize.h2} style={styles.faqAccordionSecActive.accordionIcon} />
                    </TouchableOpacity>
                    <View style={styles.faqAccordionDesc}>
                        <Text style={styles.faqAccordionDescText}>{details}</Text>
                    </View>
                </>
                :
                <TouchableOpacity onPress={()=>{setActiveAccordion(true)}} style={styles.faqAccordionSec}>
                    <Text style={styles.faqAccordionSec.faqAccordionText}>{heading}</Text>
                    <Entypo name="chevron-down" color={BKColor.textColor1} size={fontSize.h2} style={styles.faqAccordionSec.accordionIcon} />
                </TouchableOpacity>
            }

        </View>
    )

}
export default Accordion;