import spacy
from spacy.matcher import PhraseMatcher

# Load the MedSpaCy pipeline
nlp = spacy.load("en_core_web_sm")
doc = nlp("hello")

# Define symptom variations
symptoms = {
    "Diminished sweating": ["diminished sweating", "reduced sweating", "sweating less"],
    "Dry skin": ["dry skin", "skin feels dry", "my skin is dry"],
    "Cold intolerance": ["cold intolerance", "sensitive to cold", "cold sensitivity"],
    "Weight increase": ["weight increase", "weight gain", "gained weight", "increased weight"],
    "Constipation": ["constipation", "constipated", "difficulty with bowel movements"],
    "Hoarseness": ["hoarseness", "rough voice", "raspy voice"],
    "Deafness": ["deafness", "can't hear well", "difficulty hearing", "deaf"],
    "Slow movements": [
        "slow movements",
        "slower movements",
        "difficulty moving quickly",
    ],
    "Coarse skin": ["coarse skin", "rough skin", "skin is rough"],
    "Cold skin": ["cold skin", "skin feels cold", "my skin is cold"],
    "Periorbital puffiness": [
        "periorbital puffiness",
        "swollen eyes",
        "swollen under eyes",
    ],
    "Ankle jerk delayed": [
        "ankle jerk delayed",
        "delayed ankle jerk",
        "slow ankle reflex",
        "delayed reflexes",
    ],
}

# Initialize PhraseMatcher and add symptom patterns
matcher = PhraseMatcher(nlp.vocab)
for symptom, variations in symptoms.items():
    patterns = [nlp.make_doc(variation) for variation in variations]
    matcher.add(symptom, None, *patterns)


def extract_symptoms(text):
    doc = nlp(text)

    matches = matcher(doc)
    symptoms_found = []

    for match_id, start, end in matches:
        symptom = nlp.vocab.strings[match_id]

        symptoms_found.append(symptom)

    return list(set(symptoms_found))
