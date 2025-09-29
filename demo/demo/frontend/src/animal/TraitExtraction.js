const traitKeywords = {
    activity: {
        0: ['lazy', 'sedentary', 'inactive', 'relaxed', 'couch potato', 'calm', 'peaceful'],
        1: ['slightly active', 'occasional walks', 'light exercise'],
        2: ['moderate', 'balanced', 'average activity', 'regular walks', 'some exercise'],
        3: ['active', 'energetic', 'loves walks', 'outdoor', 'exercise', 'hiking'],
        4: ['very active', 'high energy', 'athletic', 'running', 'sports', 'adventure', 'hyperactive']
    },

    sociability: {
        0: ['aloof', 'solitary', 'independent', 'prefers alone', 'antisocial', 'loner'],
        1: ['somewhat social', 'selective', 'cautious with others'],
        2: ['balanced social', 'moderate social', 'gets along well'],
        3: ['social', 'friendly', 'good with others', 'enjoys company'],
        4: ['very social', 'loves everyone', 'people-oriented', 'outgoing', 'pack animal']
    },

    talkative: {
        0: ['quiet', 'silent', 'rarely vocalizes', 'mute', 'doesn\'t bark much'],
        1: ['occasionally vocal', 'speaks sometimes'],
        2: ['moderate barking', 'average vocal', 'speaks when needed'],
        3: ['talkative', 'vocal', 'expressive', 'communicative'],
        4: ['very vocal', 'chatty', 'loud', 'constantly vocalizing', 'barks frequently']
    },

    independence: {
        0: ['dependent', 'clingy', 'needs attention', 'velcro pet', 'separation anxiety'],
        1: ['somewhat dependent', 'likes company'],
        2: ['balanced independence', 'moderate independence'],
        3: ['independent', 'self-sufficient', 'confident alone'],
        4: ['very independent', 'highly independent', 'aloof', 'doesn\'t need attention']
    },

    energy: {
        0: ['low energy', 'sleepy', 'lazy', 'mellow', 'calm', 'relaxed'],
        1: ['low-moderate energy', 'peaceful'],
        2: ['moderate energy', 'balanced energy', 'average energy'],
        3: ['high energy', 'energetic', 'playful', 'spirited'],
        4: ['very high energy', 'hyperactive', 'boundless energy', 'never tired']
    },

    trainability: {
        0: ['stubborn', 'hard to train', 'independent thinker', 'difficult'],
        1: ['slow learner', 'needs patience'],
        2: ['trainable', 'average intelligence', 'learns with repetition'],
        3: ['smart', 'quick learner', 'intelligent', 'eager to please'],
        4: ['highly trainable', 'very intelligent', 'obedient', 'easy to train']
    },

    childFriendly: {
        0: ['not good with kids', 'aggressive with children', 'avoid children'],
        1: ['cautious with children', 'needs supervision'],
        2: ['okay with children', 'tolerates kids', 'moderate with children'],
        3: ['good with kids', 'child-friendly', 'gentle with children'],
        4: ['loves kids', 'great with children', 'protective of children', 'family dog']
    },

    strangerFriendly: {
        0: ['shy', 'fearful', 'aggressive to strangers', 'wary', 'timid'],
        1: ['cautious with strangers', 'needs time to warm up'],
        2: ['neutral with strangers', 'tolerates new people'],
        3: ['friendly with strangers', 'welcoming', 'outgoing'],
        4: ['loves strangers', 'very friendly', 'greets everyone', 'social butterfly']
    },

    groomingNeed: {
        0: ['low maintenance', 'minimal grooming', 'easy care', 'wash and go'],
        1: ['low-moderate grooming', 'occasional brushing'],
        2: ['moderate grooming', 'regular brushing', 'average maintenance'],
        3: ['high grooming needs', 'requires brushing', 'regular grooming'],
        4: ['very high maintenance', 'daily grooming', 'professional grooming', 'intensive care']
    },

    playfulness: {
        0: ['not playful', 'serious', 'dignified', 'prefers rest'],
        1: ['slightly playful', 'occasional play'],
        2: ['moderately playful', 'enjoys some games'],
        3: ['playful', 'fun-loving', 'enjoys games', 'active play'],
        4: ['very playful', 'always ready to play', 'puppy-like', 'loves toys']
    }
};

const extractTraitsFromDescription = (description) => {
    if (!description || typeof description !== 'string') {
        return {
            activity: 2,
            sociability: 2,
            talkative: 2,
            independence: 2,
            energy: 2,
            trainability: 2,
            childFriendly: 2,
            strangerFriendly: 2,
            groomingNeed: 2,
            playfulness: 2
        };
    }

    const lowerDescription = description.toLowerCase();

    const extractedTraits = {
        activity: 2,
        sociability: 2,
        talkative: 2,
        independence: 2,
        energy: 2,
        trainability: 2,
        childFriendly: 2,
        strangerFriendly: 2,
        groomingNeed: 2,
        playfulness: 2
    };

    Object.keys(traitKeywords).forEach(trait => {
        let foundKeywords = [];

        Object.keys(traitKeywords[trait]).forEach(score => {
            const keywords = traitKeywords[trait][score];

            keywords.forEach(keyword => {
                if (lowerDescription.includes(keyword.toLowerCase())) {
                    foundKeywords.push({
                        keyword: keyword,
                        score: parseInt(score),
                        trait: trait
                    });
                }
            });
        });

        if (foundKeywords.length > 0) {
            const averageScore = foundKeywords.reduce((sum, item) => sum + item.score, 0) / foundKeywords.length;
            extractedTraits[trait] = Math.round(averageScore);
        }
    });

    return extractedTraits;
};

const processAnimalsWithExtractedTraits = (animals) => {
    return animals.map(animal => ({
        ...animal,
        traits: extractTraitsFromDescription(animal.description)
    }));
};

export { extractTraitsFromDescription, processAnimalsWithExtractedTraits, traitKeywords };