import React from "react";
import {Select} from "antd";
// import symptoms from "./symptomList.json";

const symptoms = [
    {
        id: 1,
        name: "Abdominal Distension",
    },
    {
        id: 2,
        name: "Abdominal Pain",
    },
    {
        id: 3,
        name: "Abnormal Behaviour",
    },
    {
        id: 4,
        name: "Abnormal Body Movement",
    },
    {
        id: 5,
        name: "Abnormal Posture",
    },
    {
        id: 6,
        name: "Absent Cry At Birth",
    },
    {
        id: 7,
        name: "Acne",
    },
    {
        id: 8,
        name: "Allergen",
    },
    {
        id: 9,
        name: "Altered Sensorium",
    },
    {
        id: 10,
        name: "Anxiety",
    },
    {
        id: 11,
        name: "Asthenopic Symptom",
    },
    {
        id: 12,
        name: "Atopy",
    },
    {
        id: 13,
        name: "Back Or Flank Pain",
    },
    {
        id: 14,
        name: "Back Pain",
    },
    {
        id: 15,
        name: "Backache",
    },
    {
        id: 16,
        name: "Bleeding Per Vaginum",
    },
    {
        id: 17,
        name: "Blepharospasm",
    },
    {
        id: 18,
        name: "Blindness",
    },
    {
        id: 19,
        name: "Blister",
    },
    {
        id: 20,
        name: "Blood From Ear",
    },
    {
        id: 21,
        name: "Blood From Mouth",
    },
    {
        id: 22,
        name: "Blood From Nose",
    },
    {
        id: 23,
        name: "Blood In Urine",
    },
    {
        id: 24,
        name: "Bloody Diarrhea",
    },
    {
        id: 25,
        name: "Bluish Discoloration",
    },
    {
        id: 26,
        name: "Blurred Vision",
    },
    {
        id: 27,
        name: "Bradycardia",
    },
    {
        id: 28,
        name: "Bradykinesia",
    },
    {
        id: 29,
        name: "Breathing Difficulty",
    },
    {
        id: 30,
        name: "Breathing Too Fast",
    },
    {
        id: 31,
        name: "Breathlessness",
    },
    {
        id: 32,
        name: "Bruises",
    },
    {
        id: 33,
        name: "Bulging Of Eyes",
    },
    {
        id: 34,
        name: "Bump Near Limbus",
    },
    {
        id: 35,
        name: "Burning During Micturition",
    },
    {
        id: 36,
        name: "Burning Micturition",
    },
    {
        id: 37,
        name: "Burning Sensation",
    },
    {
        id: 38,
        name: "Change In Voice",
    },
    {
        id: 39,
        name: "Chest Discomfort",
    },
    {
        id: 40,
        name: "Chest Pain",
    },
    {
        id: 41,
        name: "Coated Tongue",
    },
    {
        id: 42,
        name: "Cold",
    },
    {
        id: 43,
        name: "Cold Intolerance",
    },
    {
        id: 44,
        name: "Colicky Abdomen Pain",
    },
    {
        id: 45,
        name: "Colour of cough",
    },
    {
        id: 46,
        name: "Coloured Halos",
    },
    {
        id: 47,
        name: "Confusion",
    },
    {
        id: 48,
        name: "Conjuctival Congestion",
    },
    {
        id: 49,
        name: "Contionous fever",
    },
    {
        id: 50,
        name: "Constipation",
    },
    {
        id: 51,
        name: "Convulsions",
    },
    {
        id: 52,
        name: "Cor Pulmonale",
    },
    {
        id: 53,
        name: "Cough",
    },
    {
        id: 54,
        name: "Cough With Expectoration",
    },
    {
        id: 55,
        name: "Cough Without Expectoration",
    },
    {
        id: 56,
        name: "Crusting",
    },
    {
        id: 57,
        name: "Curtain Like Shadow Over Visual Field",
    },
    {
        id: 58,
        name: "Cyanosis",
    },
    {
        id: 59,
        name: "Dandruff",
    },
    {
        id: 60,
        name: "Dark Spots In Visual Field",
    },
    {
        id: 61,
        name: "Deafness",
    },
    {
        id: 62,
        name: "Decrease Urine Output",
    },
    {
        id: 63,
        name: "Decrease Vision Activity",
    },
    {
        id: 64,
        name: "Decreased Apetite",
    },
    {
        id: 65,
        name: "Decreased Vision",
    },
    {
        id: 66,
        name: "Deformity",
    },
    {
        id: 67,
        name: "Delayed Periods",
    },
    {
        id: 68,
        name: "Depression",
    },
    {
        id: 69,
        name: "Dermatomes",
    },
    {
        id: 70,
        name: "Developmental Delay",
    },
    {
        id: 71,
        name: "Diarrhea",
    },
    {
        id: 72,
        name: "Difficulty In Breathing",
    },
    {
        id: 73,
        name: "Difficulty In Movement",
    },
    {
        id: 74,
        name: "Difficulty In Speech Language",
    },
    {
        id: 75,
        name: "Difficulty In Swallowing",
    },
    {
        id: 76,
        name: "Difficulty Walking",
    },
    {
        id: 77,
        name: "Dilated Pupils",
    },
    {
        id: 78,
        name: "Diminution of Vision",
    },
    {
        id: 79,
        name: "Discharge",
    },
    {
        id: 80,
        name: "Discharge PV",
    },
    {
        id: 81,
        name: "Discomfort",
    },
    {
        id: 82,
        name: "Distorted Vision",
    },
    {
        id: 83,
        name: "Dizziness",
    },
    {
        id: 84,
        name: "Double Vision",
    },
    {
        id: 85,
        name: "Drooping Of Eyelid",
    },
    {
        id: 86,
        name: "Dropping Things",
    },
    {
        id: 87,
        name: "Dry Cough",
    },
    {
        id: 88,
        name: "Dry Eyes",
    },
    {
        id: 89,
        name: "Dry Mouth",
    },
    {
        id: 90,
        name: "Dry Skin",
    },
    {
        id: 91,
        name: "Dryness",
    },
    {
        id: 92,
        name: "Duration Association",
    },
    {
        id: 93,
        name: "Dust Pan",
    },
    {
        id: 94,
        name: "Dyspnea",
    },
    {
        id: 95,
        name: "Ear Discharge",
    },
    {
        id: 96,
        name: "Easy Bruising Around Face",
    },
    {
        id: 97,
        name: "Easy Fatigability",
    },
    {
        id: 98,
        name: "Edema",
    },
    {
        id: 99,
        name: "Elevated blood pressure",
    },
    {
        id: 100,
        name: "Epistaxix",
    },
    {
        id: 101,
        name: "Erosions",
    },
    {
        id: 102,
        name: "Excess Nausea",
    },
    {
        id: 103,
        name: "Excess Vomiting",
    },
    {
        id: 104,
        name: "Exercise Intolerance",
    },
    {
        id: 105,
        name: "Exertional Dyspnea",
    },
    {
        id: 106,
        name: "Extremely Painful Joints",
    },
    {
        id: 107,
        name: "Eye Irritation",
    },
    {
        id: 108,
        name: "Eye Fatigue",
    },
    {
        id: 109,
        name: "Eye Pain",
    },
    {
        id: 110,
        name: "Eye Puffiness",
    },
    {
        id: 111,
        name: "Foreign Body Sensation Throat",
    },
    {
        id: 112,
        name: "Facial Puffiness",
    },
    {
        id: 113,
        name: "Fall Built",
    },
    {
        id: 114,
        name: "Falling",
    },
    {
        id: 115,
        name: "Family History",
    },
    {
        id: 116,
        name: "Fatigue",
    },
    {
        id: 117,
        name: "Feeding difficulty",
    },
    {
        id: 118,
        name: "Fever",
    },
    {
        id: 119,
        name: "Fever >38' C",
    },
    {
        id: 120,
        name: "Fever With Chills",
    },
    {
        id: 121,
        name: "Fever With Chills & Rigor",
    },
    {
        id: 122,
        name: "Fever With Rash",
    },
    {
        id: 123,
        name: "Floaters",
    },
    {
        id: 124,
        name: "Foamy Urine",
    },
    {
        id: 125,
        name: "Foreign Body Present Over Cornea",
    },
    {
        id: 126,
        name: "Foreign Body Sensation",
    },
    {
        id: 127,
        name: "Frequent Pnumonia",
    },
    {
        id: 129,
        name: "Gait Disturbance",
    },
    {
        id: 130,
        name: "Grayish White Membrane",
    },
    {
        id: 131,
        name: "Grunting",
    },
    {
        id: 132,
        name: "Haemoptysis",
    },
    {
        id: 133,
        name: "Hair Loss Site",
    },
    {
        id: 134,
        name: "Hard Stool",
    },
    {
        id: 135,
        name: "Headache",
    },
    {
        id: 136,
        name: "Hearing Loss",
    },
    {
        id: 137,
        name: "Heart Burn",
    },
    {
        id: 138,
        name: "Heat Intolerance",
    },
    {
        id: 139,
        name: "Heavy Menses/ Bleeding",
    },
    {
        id: 140,
        name: "Hematemesis",
    },
    {
        id: 141,
        name: "Hematuria",
    },
    {
        id: 142,
        name: "Hemoptysis",
    },
    {
        id: 143,
        name: "High fever",
    },
    {
        id: 144,
        name: "Hirsutism",
    },
    {
        id: 145,
        name: "Hypertension",
    },
    {
        id: 146,
        name: "Icterus",
    },
    {
        id: 147,
        name: "Impaired Behaviour",
    },
    {
        id: 148,
        name: "Impaired Bladder Control",
    },
    {
        id: 149,
        name: "Impaired Memory",
    },
    {
        id: 150,
        name: "Impaired Thinking",
    },
    {
        id: 151,
        name: "Inability To Close Eyes",
    },
    {
        id: 152,
        name: "Inability To Take Orally",
    },
    {
        id: 153,
        name: "Increase Palpitations",
    },
    {
        id: 154,
        name: "Increase Urine Frequency",
    },
    {
        id: 155,
        name: "Increased Fat Around The Neck",
    },
    {
        id: 156,
        name: "Increased Hunger",
    },
    {
        id: 157,
        name: "Increased Thirst",
    },
    {
        id: 158,
        name: "Infertility",
    },
    {
        id: 159,
        name: "Intensely Prusitis Macules",
    },
    {
        id: 160,
        name: "Intermenstrual Bleeding",
    },
    {
        id: 161,
        name: "Irregular Blood Pressure Variability",
    },
    {
        id: 162,
        name: "Irregular Periods",
    },
    {
        id: 163,
        name: "Irritability",
    },
    {
        id: 164,
        name: "Irritation In Throat",
    },
    {
        id: 165,
        name: "Itching",
    },
    {
        id: 166,
        name: "Itching In Ear",
    },
    {
        id: 167,
        name: "Itching In Nose",
    },
    {
        id: 168,
        name: "Itching Over Pelvis",
    },
    {
        id: 169,
        name: "Itching Site",
    },
    {
        id: 170,
        name: "Itching Ulcer Site",
    },
    {
        id: 171,
        name: "Jaw Tenderness",
    },
    {
        id: 172,
        name: "Joint Pain",
    },
    {
        id: 173,
        name: "Joint Redness",
    },
    {
        id: 174,
        name: "Joint Stiffness",
    },
    {
        id: 175,
        name: "Joint Swelling",
    },
    {
        id: 176,
        name: "Joint Tenderness",
    },
    {
        id: 177,
        name: "Lack Of Conciousness",
    },
    {
        id: 178,
        name: "Lack Of Immunization",
    },
    {
        id: 179,
        name: "Large Head",
    },
    {
        id: 180,
        name: "Larger Waistline",
    },
    {
        id: 181,
        name: "Leaking Per Vaginum",
    },
    {
        id: 182,
        name: "Learning Difficulty",
    },
    {
        id: 183,
        name: "Lesion Itching",
    },
    {
        id: 184,
        name: "Lid Lag",
    },
    {
        id: 185,
        name: "Lid Swelling",
    },
    {
        id: 186,
        name: "Loose Stool",
    },
    {
        id: 187,
        name: "Loss Of Apetite",
    },
    {
        id: 188,
        name: "Loss Of Conciousness",
    },
    {
        id: 189,
        name: "Loss Of Depth Perception",
    },
    {
        id: 190,
        name: "Loss Of Feeling In Face",
    },
    {
        id: 191,
        name: "Loss Of Flexibility",
    },
    {
        id: 192,
        name: "Loss Of Smell",
    },
    {
        id: 193,
        name: "Loss Of Taste",
    },
    {
        id: 194,
        name: "Loss Of Tears",
    },
    {
        id: 195,
        name: "Loss Of Vision",
    },
    {
        id: 196,
        name: "Lower Back Pain",
    },
    {
        id: 197,
        name: "Malaise",
    },
    {
        id: 198,
        name: "Microcephaly",
    },
    {
        id: 199,
        name: "Mild Dementia",
    },
    {
        id: 200,
        name: "Mild Irritation",
    },
    {
        id: 201,
        name: "Mild Pain",
    },
    {
        id: 202,
        name: "Missed Periods",
    },
    {
        id: 203,
        name: "Missed Periods More Than Seven months",
    },
    {
        id: 204,
        name: "Mucosal Bleed",
    },
    {
        id: 205,
        name: "Muscle Ache",
    },
    {
        id: 206,
        name: "Muscle Spasm",
    },
    {
        id: 207,
        name: "Muscle Weakness",
    },
    {
        id: 208,
        name: "Myalgia",
    },
    {
        id: 209,
        name: "Myxedema",
    },
    {
        id: 210,
        name: "NaiL Pattern",
    },
    {
        id: 211,
        name: "Nasal Discharge",
    },
    {
        id: 212,
        name: "Nasal Obstruction",
    },
    {
        id: 213,
        name: "Nausea",
    },
    {
        id: 214,
        name: "Neck pain",
    },
    {
        id: 215,
        name: "Neck Stiffness",
    },
    {
        id: 216,
        name: "Night Itch",
    },
    {
        id: 217,
        name: "No Eye Contact",
    },
    {
        id: 218,
        name: "Noisy Breathing",
    },
    {
        id: 219,
        name: "Non passage Of Stool",
    },
    {
        id: 220,
        name: "Numbness",
    },
    {
        id: 221,
        name: "Oral Ulcer",
    },
    {
        id: 222,
        name: "Orthopnea",
    },
    {
        id: 223,
        name: "Pain",
    },
    {
        id: 224,
        name: "Pain And Stiffness In The Hips",
    },
    {
        id: 225,
        name: "Pain And Stiffness In The Lower back",
    },
    {
        id: 226,
        name: "Pain In Ear",
    },
    {
        id: 227,
        name: "Pain In Eye Movement",
    },
    {
        id: 228,
        name: "Pain In Limbs",
    },
    {
        id: 229,
        name: "Pain In Throats",
    },
    {
        id: 230,
        name: "Pain On EOM",
    },
    {
        id: 231,
        name: "Pain Ulcer Site",
    },
    {
        id: 232,
        name: "Painful Coitus",
    },
    {
        id: 233,
        name: "Painful Menses",
    },
    {
        id: 234,
        name: "Painful Micturition",
    },
    {
        id: 235,
        name: "Painless Selling On Lids",
    },
    {
        id: 236,
        name: "Pale",
    },
    {
        id: 237,
        name: "Palms & Soles",
    },
    {
        id: 238,
        name: "Palpitations",
    },
    {
        id: 239,
        name: "Paraplegia",
    },
    {
        id: 240,
        name: "Parotitis",
    },
    {
        id: 241,
        name: "Paroxysmal Nocturnal Dyspnea",
    },
    {
        id: 242,
        name: "Partner",
    },
    {
        id: 243,
        name: "Pedal Edema",
    },
    {
        id: 244,
        name: "Personal Fatigue",
    },
    {
        id: 245,
        name: "Petechiae",
    },
    {
        id: 246,
        name: "Periorbital Puffiness",
    },
    {
        id: 247,
        name: "Photo Sensitivity",
    },
    {
        id: 248,
        name: "Photophobia",
    },
    {
        id: 249,
        name: "Photopsia",
    },
    {
        id: 250,
        name: "Pleuritic Pain",
    },
    {
        id: 252,
        name: "Poor Weight Gain",
    },
    {
        id: 253,
        name: "Postcoital Bleeding",
    },
    {
        id: 254,
        name: "Production of cough because of smoking",
    },
    {
        id: 255,
        name: "Prolonged Bleed",
    },
    {
        id: 256,
        name: "Proptosis",
    },
    {
        id: 257,
        name: "Ptosis",
    },
    {
        id: 258,
        name: "Puffiness",
    },
    {
        id: 259,
        name: "Puffy Eyes",
    },
    {
        id: 260,
        name: "Purpura",
    },
    {
        id: 261,
        name: "Quadriplegia",
    },
    {
        id: 262,
        name: "Rash",
    },
    {
        id: 263,
        name: "Red Lesions",
    },
    {
        id: 264,
        name: "Red Tender Swelling On Lids",
    },
    {
        id: 265,
        name: "Redness",
    },
    {
        id: 266,
        name: "Redness Of Eyelid",
    },
    {
        id: 267,
        name: "Refuse To Feed",
    },
    {
        id: 268,
        name: "Resting Tremor",
    },
    {
        id: 269,
        name: "Restlessness",
    },
    {
        id: 270,
        name: "Rigidity",
    },
    {
        id: 271,
        name: "Ropy Discharge",
    },
    {
        id: 272,
        name: "Running Nose",
    },
    {
        id: 273,
        name: "Scaling",
    },
    {
        id: 274,
        name: "Scalp Involvement",
    },
    {
        id: 275,
        name: "Scar",
    },
    {
        id: 276,
        name: "Seasonal Variation",
    },
    {
        id: 277,
        name: "Secondary Infection",
    },
    {
        id: 278,
        name: "Seizure",
    },
    {
        id: 279,
        name: "Sensitivity To Light",
    },
    {
        id: 280,
        name: "Severe Headache",
    },
    {
        id: 281,
        name: "Severe Itching",
    },
    {
        id: 282,
        name: "Shortness Of Breath",
    },
    {
        id: 283,
        name: "Shrill Cry",
    },
    {
        id: 284,
        name: "Skin Rash",
    },
    {
        id: 285,
        name: "Slurring Of Speech",
    },
    {
        id: 286,
        name: "Small Yellow Growth",
    },
    {
        id: 287,
        name: "Sneezing",
    },
    {
        id: 288,
        name: "Shortness Of Breathing",
    },
    {
        id: 289,
        name: "Shortness Of Breathing On Exertion",
    },
    {
        id: 290,
        name: "Something Coming Out Of Vagina",
    },
    {
        id: 291,
        name: "Sore Throat",
    },
    {
        id: 292,
        name: "Spine Deformity",
    },
    {
        id: 293,
        name: "Spine Stiffness",
    },
    {
        id: 294,
        name: "Squint",
    },
    {
        id: 295,
        name: "Staring Look",
    },
    {
        id: 296,
        name: "Steroid Abuse",
    },
    {
        id: 297,
        name: "Stiff Neck",
    },
    {
        id: 298,
        name: "Sweating",
    },
    {
        id: 299,
        name: "Swelling",
    },
    {
        id: 300,
        name: "Swelling In Muscle",
    },
    {
        id: 301,
        name: "Swollen Finger & Toes",
    },
    {
        id: 302,
        name: "Syneope",
    },
    {
        id: 303,
        name: "Tachypnea",
    },
    {
        id: 304,
        name: "Temperature Instability",
    },
    {
        id: 305,
        name: "Tender Red",
    },
    {
        id: 306,
        name: "Tenderness",
    },
    {
        id: 307,
        name: "Tinnitus",
    },
    {
        id: 308,
        name: "Tone Abnormality",
    },
    {
        id: 309,
        name: "Tracheal Shift",
    },
    {
        id: 310,
        name: "Trail Sign",
    },
    {
        id: 311,
        name: "Tripping",
    },
    {
        id: 312,
        name: "Trouble Seeing",
    },
    {
        id: 313,
        name: "Ulcers",
    },
    {
        id: 314,
        name: "Unable To Conceive",
    },
    {
        id: 315,
        name: "Urinary Incontinence",
    },
    {
        id: 316,
        name: "Vertigo",
    },
    {
        id: 317,
        name: "Vomiting",
    },
    {
        id: 318,
        name: "Watering",
    },
    {
        id: 319,
        name: "Weakness",
    },
    {
        id: 320,
        name: "Weakness In Face",
    },
    {
        id: 321,
        name: "Weakness Of Limbs",
    },
    {
        id: 322,
        name: "Weight Gain",
    },
    {
        id: 323,
        name: "Weight Loss",
    },
    {
        id: 324,
        name: "Winter Aggravation",
    },
    {
        id: 325,
        name: "Young Age",
    },
];

const {Option} = Select;

const children = [];

for (let each in symptoms) {
    children.push(
        <Option key={symptoms[each].name}>{symptoms[each].name}</Option>
    );
}

function CustomSelect({
                          handleSymptomsChanges,
                          handleSymptomSelect,
                          hendleSymptomDeselect,
                      }) {
    // const handleChange = (value) => {
    //   console.log(`selected ${value}`);
    // };

    // const handleSelect = (value) => {
    //   console.log(`selected ${value}`);
    // };
    return (
        <div className="mt10 mb10  cdss-select">
            <Select
                mode="tags"
                style={{width: "100%"}}
                onChange={handleSymptomsChanges}
                tokenSeparators={[","]}
                placeholder="Search for symptoms"
                onSelect={handleSymptomSelect}
                onDeselect={hendleSymptomDeselect}
            >
                {children}
            </Select>
        </div>
    );
}

export default CustomSelect;
