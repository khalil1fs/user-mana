import { CommunauteSavoirChercheurVo } from './CommunauteSavoirChercheur.model';
import { TypeEntiteAdministrativeVo } from '../referentiel/TypeEntiteAdministrative.model';
import { DepartementScientifiqueVo } from './DepartementScientifique.model';
import { ZoneActiviteInteractionRechercheVo } from './ZoneActiviteInteractionRecherche.model';
import { GradeVo } from '../referentiel/Grade.model';
import { CorpsVo } from '../referentiel/Corps.model';
import { CommissionScientifiqueVo } from './CommissionScientifique.model';
import { PaysVo } from '../referentiel/Pays.model';
import { IdentifiantAuteurExpertVo } from './IdentifiantAuteurExpert.model';
import { DomaineScientifiqueChercheurVo } from './DomaineScientifiqueChercheur.model';
import { EntiteAdministrativeVo } from '../referentiel/EntiteAdministrative.model';
import { SexeVo } from '../referentiel/Sexe.model';
import { VilleVo } from '../referentiel/Ville.model';
import { InstrumentsEtDispositifsIrdChercheurVo } from './InstrumentsEtDispositifsIrdChercheur.model';
import { User } from './User.model';
import { AffectationStructurelleVo } from '../referentiel/AffectationStructurelle.model';
import { ChercheurEmailVo } from './ChercheurEmail.model';
import { DisciplineScientifiqueChercheurVo } from './DisciplineScientifiqueChercheur.model';
import { InstrumentIrdChercheurVo } from './InstrumentIrdChercheur.model';
import { TypeInstrumentIrdChercheurVo } from './TypeInstrumentIrdChercheur.model';
import { EnjeuxIrdChercheurVo } from './EnjeuxIrdChercheur.model';
import { DepartementScientifiqueChercheurVo } from './DepartementScientifiqueChercheur';

export class ChercheurVo extends User {
    public consentementRgpd: Boolean;
    public archive: boolean;
    public dateArchivage: Date;
    public numeroMatricule: string;
    public email: string;
    public natureImplication: string;
    public resume: string;
    public formationEnManagement: boolean;
    public credentialsNonExpired: boolean;
    public enabled: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    public accountNonExpired: boolean;
    public accountNonLocked: boolean;
    public username: string;
    public password: string;
    public prenom: string;
    public nom: string;
    public role: string;
    public passwordChanged: boolean;

    public createdAtMax: string;
    public createdAtMin: string;

    public dateArchivageMax: string;
    public dateArchivageMin: string;


    public updatedAtMax: string;
    public updatedAtMin: string;
    public affectationStructurelleVo: AffectationStructurelleVo;
    public typeEntiteAdministrativeVo: TypeEntiteAdministrativeVo;
    public entiteAdministrativeVo: EntiteAdministrativeVo;
    public paysVo: PaysVo;
    public paysAffectationGeoVo: PaysVo;
    public villeVo: VilleVo;
    public departementScientifiqueVo: DepartementScientifiqueVo;
    public commissionScientifiqueVo: CommissionScientifiqueVo;
    public gradeVo: GradeVo;
    public corpsVo: CorpsVo;
    public sexeVo: SexeVo;
    /** to remove */
    public domaineScientifiqueChercheursVo: Array<DomaineScientifiqueChercheurVo>;
    public instrumentsEtDispositifsIrdChercheursVo: Array<InstrumentsEtDispositifsIrdChercheurVo>;
    /** fin to remove */
    public zoneActiviteInteractionRecherchesVo: Array<ZoneActiviteInteractionRechercheVo>;
    public communauteSavoirChercheursVo: Array<CommunauteSavoirChercheurVo>;
    public identifiantAuteurExpertsVo: Array<IdentifiantAuteurExpertVo>;
    public chercheurEmailsVo: Array<ChercheurEmailVo>;
    public disciplineScientifiqueChercheursVo: Array<DisciplineScientifiqueChercheurVo>;
    public enjeuxIrdChercheursVo: Array<EnjeuxIrdChercheurVo>;
    public instrumentIrdChercheursVo: Array<InstrumentIrdChercheurVo>;
    public typeInstrumentIrdChercheursVo: Array<TypeInstrumentIrdChercheurVo>;
    public departementScientifiqueChercheursVo: Array<DepartementScientifiqueChercheurVo>;
    public villeAffectationGeo:string;
}
