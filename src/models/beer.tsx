export class Beer {
    id!: number;
    name!: string;
    tagline!: string;
    first_brewed!: Date;
    description!: string;
    image_url!: string;
    abv!: number;
    ibu: number | undefined;
    target_fg!: number;
    target_og!: number;
    ebc: number | undefined;
    srm: number | undefined;
    ph: number | undefined;
    attenuation_level!: number;
    food_pairing!: string[];
    brewers_tips!: string;
    contributed_by!: string;
    volume!: Amount;
    boil_volume!: Amount;
    method!: Method;
    ingredients!: Ingredients;
}

export class Amount {
    value!: number;
    unit!: string;
}

export class Method {
    mash_temp!: MashTemp;
    fermentation!: Amount;
    twist: string | undefined;
}

export class MashTemp {
    temp!: Amount;
    duration: number | undefined;
}

export class Ingredients {
    malt!: Ingredient[];
    hops!: Ingredient[];
    yeast!: string;
}

export class Ingredient {
    name!: string;
    amount!: Amount;
    add!: string;
    attribute!: string;
}