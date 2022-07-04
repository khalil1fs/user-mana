/* tslint:disable:max-line-length */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {LoginAdminComponent} from './login-admin/login-admin.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';

import {
    OutilFormationContinueCreateAdminComponent
} from './view/referentiel/outil-formation-continue-admin/create-admin/outil-formation-continue-create-admin.component';
import {
    OutilFormationContinueEditAdminComponent
} from './view/referentiel/outil-formation-continue-admin/edit-admin/outil-formation-continue-edit-admin.component';
import {
    OutilFormationContinueViewAdminComponent
} from './view/referentiel/outil-formation-continue-admin/view-admin/outil-formation-continue-view-admin.component';
import {
    OutilFormationContinueListAdminComponent
} from './view/referentiel/outil-formation-continue-admin/list-admin/outil-formation-continue-list-admin.component';
import {
    OutilFormationContinueAdminComponent
} from './view/referentiel/outil-formation-continue-admin/outil-formation-continue-admin.component';
import {
    FinancementDoctorantCreateAdminComponent
} from './view/referentiel/financement-doctorant-admin/create-admin/financement-doctorant-create-admin.component';
import {
    FinancementDoctorantEditAdminComponent
} from './view/referentiel/financement-doctorant-admin/edit-admin/financement-doctorant-edit-admin.component';
import {
    FinancementDoctorantViewAdminComponent
} from './view/referentiel/financement-doctorant-admin/view-admin/financement-doctorant-view-admin.component';
import {
    FinancementDoctorantListAdminComponent
} from './view/referentiel/financement-doctorant-admin/list-admin/financement-doctorant-list-admin.component';
import {FinancementDoctorantAdminComponent} from './view/referentiel/financement-doctorant-admin/financement-doctorant-admin.component';
import {GradeCreateAdminComponent} from './view/referentiel/grade-admin/create-admin/grade-create-admin.component';
import {GradeEditAdminComponent} from './view/referentiel/grade-admin/edit-admin/grade-edit-admin.component';
import {GradeViewAdminComponent} from './view/referentiel/grade-admin/view-admin/grade-view-admin.component';
import {GradeListAdminComponent} from './view/referentiel/grade-admin/list-admin/grade-list-admin.component';
import {GradeAdminComponent} from './view/referentiel/grade-admin/grade-admin.component';
import {
    EncadrementDoctorantListAdminComponent
} from './view/formulaire/encadrement-doctorant-admin/list-admin/encadrement-doctorant-list-admin.component';
import {EncadrementDoctorantAdminComponent} from './view/formulaire/encadrement-doctorant-admin/encadrement-doctorant-admin.component';
import {PublicCibleCreateAdminComponent} from './view/referentiel/public-cible-admin/create-admin/public-cible-create-admin.component';
import {PublicCibleEditAdminComponent} from './view/referentiel/public-cible-admin/edit-admin/public-cible-edit-admin.component';
import {PublicCibleViewAdminComponent} from './view/referentiel/public-cible-admin/view-admin/public-cible-view-admin.component';
import {PublicCibleListAdminComponent} from './view/referentiel/public-cible-admin/list-admin/public-cible-list-admin.component';
import {PublicCibleAdminComponent} from './view/referentiel/public-cible-admin/public-cible-admin.component';
import {
    FormationContinueCreateAdminComponent
} from './view/formulaire/formation-continue-admin/create-admin/formation-continue-create-admin.component';
import {
    FormationContinueEditAdminComponent
} from './view/formulaire/formation-continue-admin/edit-admin/formation-continue-edit-admin.component';
import {
    FormationContinueViewAdminComponent
} from './view/formulaire/formation-continue-admin/view-admin/formation-continue-view-admin.component';
import {
    FormationContinueListAdminComponent
} from './view/formulaire/formation-continue-admin/list-admin/formation-continue-list-admin.component';
import {FormationContinueAdminComponent} from './view/formulaire/formation-continue-admin/formation-continue-admin.component';
import {PaysCreateAdminComponent} from './view/referentiel/pays-admin/create-admin/pays-create-admin.component';
import {PaysEditAdminComponent} from './view/referentiel/pays-admin/edit-admin/pays-edit-admin.component';
import {PaysViewAdminComponent} from './view/referentiel/pays-admin/view-admin/pays-view-admin.component';
import {PaysListAdminComponent} from './view/referentiel/pays-admin/list-admin/pays-list-admin.component';
import {PaysAdminComponent} from './view/referentiel/pays-admin/pays-admin.component';
import {
    TemplateRelanceCreateAdminComponent
} from './view/referentiel/template-relance-admin/create-admin/template-relance-create-admin.component';
import {
    TemplateRelanceEditAdminComponent
} from './view/referentiel/template-relance-admin/edit-admin/template-relance-edit-admin.component';
import {
    TemplateRelanceViewAdminComponent
} from './view/referentiel/template-relance-admin/view-admin/template-relance-view-admin.component';
import {
    TemplateRelanceListAdminComponent
} from './view/referentiel/template-relance-admin/list-admin/template-relance-list-admin.component';
import {TemplateRelanceAdminComponent} from './view/referentiel/template-relance-admin/template-relance-admin.component';
import {
    MasterInternationalCreateAdminComponent
} from './view/referentiel/master-international-admin/create-admin/master-international-create-admin.component';
import {
    MasterInternationalEditAdminComponent
} from './view/referentiel/master-international-admin/edit-admin/master-international-edit-admin.component';
import {
    MasterInternationalViewAdminComponent
} from './view/referentiel/master-international-admin/view-admin/master-international-view-admin.component';
import {
    MasterInternationalListAdminComponent
} from './view/referentiel/master-international-admin/list-admin/master-international-list-admin.component';
import {MasterInternationalAdminComponent} from './view/referentiel/master-international-admin/master-international-admin.component';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent
} from './view/formulaire/dev-sav-innov-sci-admin/create-admin/dev-sav-innov-sci-create-admin';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent
} from './view/formulaire/dev-sav-innov-sci-admin/edit-admin/dev-sav-innov-sci-edit-admin';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent
} from './view/formulaire/dev-sav-innov-sci-admin/view-admin/dev-sav-innov-sci-view-admin';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent
} from './view/formulaire/dev-sav-innov-sci-admin/list-admin/dev-sav-innov-sci-list-admin';
import {
    DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent
} from './view/formulaire/dev-sav-innov-sci-admin/dev-sav-innov-sci-admin';
import {TypeExpertCreateAdminComponent} from './view/referentiel/type-expert-admin/create-admin/type-expert-create-admin.component';
import {TypeExpertEditAdminComponent} from './view/referentiel/type-expert-admin/edit-admin/type-expert-edit-admin.component';
import {TypeExpertViewAdminComponent} from './view/referentiel/type-expert-admin/view-admin/type-expert-view-admin.component';
import {TypeExpertListAdminComponent} from './view/referentiel/type-expert-admin/list-admin/type-expert-list-admin.component';
import {TypeExpertAdminComponent} from './view/referentiel/type-expert-admin/type-expert-admin.component';
import {
    IdentifiantAuteurExpertCreateAdminComponent
} from './view/formulaire/identifiant-auteur-expert-admin/create-admin/identifiant-auteur-expert-create-admin.component';
import {
    IdentifiantAuteurExpertEditAdminComponent
} from './view/formulaire/identifiant-auteur-expert-admin/edit-admin/identifiant-auteur-expert-edit-admin.component';
import {
    IdentifiantAuteurExpertViewAdminComponent
} from './view/formulaire/identifiant-auteur-expert-admin/view-admin/identifiant-auteur-expert-view-admin.component';
import {
    IdentifiantAuteurExpertListAdminComponent
} from './view/formulaire/identifiant-auteur-expert-admin/list-admin/identifiant-auteur-expert-list-admin.component';
import {
    IdentifiantAuteurExpertAdminComponent
} from './view/formulaire/identifiant-auteur-expert-admin/identifiant-auteur-expert-admin.component';
import {
    CampagneChercheurCreateAdminComponent
} from './view/formulaire/campagne-chercheur-admin/create-admin/campagne-chercheur-create-admin.component';
import {
    CampagneChercheurEditAdminComponent
} from './view/formulaire/campagne-chercheur-admin/edit-admin/campagne-chercheur-edit-admin.component';
import {
    CampagneChercheurViewAdminComponent
} from './view/formulaire/campagne-chercheur-admin/view-admin/campagne-chercheur-view-admin.component';
import {
    CampagneChercheurListAdminComponent
} from './view/formulaire/campagne-chercheur-admin/list-admin/campagne-chercheur-list-admin.component';
import {CampagneChercheurAdminComponent} from './view/formulaire/campagne-chercheur-admin/campagne-chercheur-admin.component';
import {
    VieInstitutionnelleCreateAdminComponent
} from './view/formulaire/vie-institutionnelle-admin/create-admin/vie-institutionnelle-create-admin.component';
import {
    VieInstitutionnelleEditAdminComponent
} from './view/formulaire/vie-institutionnelle-admin/edit-admin/vie-institutionnelle-edit-admin.component';
import {
    VieInstitutionnelleViewAdminComponent
} from './view/formulaire/vie-institutionnelle-admin/view-admin/vie-institutionnelle-view-admin.component';
import {
    VieInstitutionnelleListAdminComponent
} from './view/formulaire/vie-institutionnelle-admin/list-admin/vie-institutionnelle-list-admin.component';
import {VieInstitutionnelleAdminComponent} from './view/formulaire/vie-institutionnelle-admin/vie-institutionnelle-admin.component';
import {
    CommunauteSavoirChercheurCreateAdminComponent
} from './view/formulaire/cosav-chercheur-admin/create-admin/cosav-chercheur-create-admin';
import {CommunauteSavoirChercheurEditAdminComponent} from './view/formulaire/cosav-chercheur-admin/edit-admin/cosav-chercheur-edit-admin';
import {CommunauteSavoirChercheurViewAdminComponent} from './view/formulaire/cosav-chercheur-admin/view-admin/cosav-chercheur-view-admin';
import {CommunauteSavoirChercheurListAdminComponent} from './view/formulaire/cosav-chercheur-admin/list-admin/cosav-chercheur-list-admin';
import {CommunauteSavoirChercheurAdminComponent} from './view/formulaire/cosav-chercheur-admin/cosav-chercheur-admin';
import {
    EcoleDoctoraleCreateAdminComponent
} from './view/formulaire/ecole-doctorale-admin/create-admin/ecole-doctorale-create-admin.component';
import {EcoleDoctoraleEditAdminComponent} from './view/formulaire/ecole-doctorale-admin/edit-admin/ecole-doctorale-edit-admin.component';
import {EcoleDoctoraleViewAdminComponent} from './view/formulaire/ecole-doctorale-admin/view-admin/ecole-doctorale-view-admin.component';
import {EcoleDoctoraleListAdminComponent} from './view/formulaire/ecole-doctorale-admin/list-admin/ecole-doctorale-list-admin.component';
import {EcoleDoctoraleAdminComponent} from './view/formulaire/ecole-doctorale-admin/ecole-doctorale-admin.component';
import {EtablissementCreateAdminComponent} from './view/referentiel/etablissement-admin/create-admin/etablissement-create-admin.component';
import {EtablissementEditAdminComponent} from './view/referentiel/etablissement-admin/edit-admin/etablissement-edit-admin.component';
import {EtablissementViewAdminComponent} from './view/referentiel/etablissement-admin/view-admin/etablissement-view-admin.component';
import {EtablissementListAdminComponent} from './view/referentiel/etablissement-admin/list-admin/etablissement-list-admin.component';
import {EtablissementAdminComponent} from './view/referentiel/etablissement-admin/etablissement-admin.component';
import {
    ModeDiffusionCreateAdminComponent
} from './view/referentiel/mode-diffusion-admin/create-admin/mode-diffusion-create-admin.component';
import {ModeDiffusionEditAdminComponent} from './view/referentiel/mode-diffusion-admin/edit-admin/mode-diffusion-edit-admin.component';
import {ModeDiffusionViewAdminComponent} from './view/referentiel/mode-diffusion-admin/view-admin/mode-diffusion-view-admin.component';
import {ModeDiffusionListAdminComponent} from './view/referentiel/mode-diffusion-admin/list-admin/mode-diffusion-list-admin.component';
import {ModeDiffusionAdminComponent} from './view/referentiel/mode-diffusion-admin/mode-diffusion-admin.component';
import {
    EncadrementEtudiantCreateAdminComponent
} from './view/formulaire/encadrement-etudiant-admin/create-admin/encadrement-etudiant-create-admin.component';
import {
    EncadrementEtudiantEditAdminComponent
} from './view/formulaire/encadrement-etudiant-admin/edit-admin/encadrement-etudiant-edit-admin.component';
import {
    EncadrementEtudiantViewAdminComponent
} from './view/formulaire/encadrement-etudiant-admin/view-admin/encadrement-etudiant-view-admin.component';
import {
    EncadrementEtudiantListAdminComponent
} from './view/formulaire/encadrement-etudiant-admin/list-admin/encadrement-etudiant-list-admin.component';
import {EncadrementEtudiantAdminComponent} from './view/formulaire/encadrement-etudiant-admin/encadrement-etudiant-admin.component';
import {
    TemplateClotureCreateAdminComponent
} from './view/referentiel/template-cloture-admin/create-admin/template-cloture-create-admin.component';
import {
    TemplateClotureEditAdminComponent
} from './view/referentiel/template-cloture-admin/edit-admin/template-cloture-edit-admin.component';
import {
    TemplateClotureViewAdminComponent
} from './view/referentiel/template-cloture-admin/view-admin/template-cloture-view-admin.component';
import {
    TemplateClotureListAdminComponent
} from './view/referentiel/template-cloture-admin/list-admin/template-cloture-list-admin.component';
import {TemplateClotureAdminComponent} from './view/referentiel/template-cloture-admin/template-cloture-admin.component';
import {InstitutionCreateAdminComponent} from './view/referentiel/institution-admin/create-admin/institution-create-admin.component';
import {InstitutionEditAdminComponent} from './view/referentiel/institution-admin/edit-admin/institution-edit-admin.component';
import {InstitutionViewAdminComponent} from './view/referentiel/institution-admin/view-admin/institution-view-admin.component';
import {InstitutionListAdminComponent} from './view/referentiel/institution-admin/list-admin/institution-list-admin.component';
import {InstitutionAdminComponent} from './view/referentiel/institution-admin/institution-admin.component';
import {EnjeuxIrdCreateAdminComponent} from './view/referentiel/enjeux-ird-admin/create-admin/enjeux-ird-create-admin.component';
import {EnjeuxIrdEditAdminComponent} from './view/referentiel/enjeux-ird-admin/edit-admin/enjeux-ird-edit-admin.component';
import {EnjeuxIrdViewAdminComponent} from './view/referentiel/enjeux-ird-admin/view-admin/enjeux-ird-view-admin.component';
import {EnjeuxIrdListAdminComponent} from './view/referentiel/enjeux-ird-admin/list-admin/enjeux-ird-list-admin.component';
import {EnjeuxIrdAdminComponent} from './view/referentiel/enjeux-ird-admin/enjeux-ird-admin.component';
import {
    EtatReclamationCreateAdminComponent
} from './view/config/etat-reclamation-admin/create-admin/etat-reclamation-create-admin.component';
import {EtatReclamationEditAdminComponent} from './view/config/etat-reclamation-admin/edit-admin/etat-reclamation-edit-admin.component';
import {EtatReclamationViewAdminComponent} from './view/config/etat-reclamation-admin/view-admin/etat-reclamation-view-admin.component';
import {EtatReclamationListAdminComponent} from './view/config/etat-reclamation-admin/list-admin/etat-reclamation-list-admin.component';
import {EtatReclamationAdminComponent} from './view/config/etat-reclamation-admin/etat-reclamation-admin.component';
import {
    CultureSciRecontreGpjpAdminComponent
} from './view/formulaire/culture-sci-recontre-gpjp-admin/create-admin/culture-sci-recontre-gpjp-create-admin.component';
import {
    CultureScientifiqueRecontreGrandPublicJeunePublicEditAdminComponent
} from './view/formulaire/culture-sci-recontre-gpjp-admin/edit-admin/culture-sci-recontre-gpjp-edit-admin.component';
import {
    CultureScientifiqueRecontreGrandPublicJeunePublicViewAdminComponent
} from './view/formulaire/culture-sci-recontre-gpjp-admin/view-admin/culture-sci-recontre-gpjp-view-admin.component';
import {
    CultureScientifiqueRecontreGrandPublicJeunePublicListAdminComponent
} from './view/formulaire/culture-sci-recontre-gpjp-admin/list-admin/culture-sci-recontre-gpjp-list-admin.component';
import {
    CultureScientifiqueRecontreGrandPublicJeunePublicAdminComponent
} from './view/formulaire/culture-sci-recontre-gpjp-admin/culture-sci-recontre-gpjp-admin.component';
import {EtudiantCreateAdminComponent} from './view/formulaire/etudiant-admin/create-admin/etudiant-create-admin.component';
import {EtudiantEditAdminComponent} from './view/formulaire/etudiant-admin/edit-admin/etudiant-edit-admin.component';
import {EtudiantViewAdminComponent} from './view/formulaire/etudiant-admin/view-admin/etudiant-view-admin.component';
import {EtudiantListAdminComponent} from './view/formulaire/etudiant-admin/list-admin/etudiant-list-admin.component';
import {EtudiantAdminComponent} from './view/formulaire/etudiant-admin/etudiant-admin.component';
import {
    EtatEtapeCampagneCreateAdminComponent
} from './view/config/etat-etape-campagne-admin/create-admin/etat-etape-campagne-create-admin.component';
import {
    EtatEtapeCampagneEditAdminComponent
} from './view/config/etat-etape-campagne-admin/edit-admin/etat-etape-campagne-edit-admin.component';
import {
    EtatEtapeCampagneViewAdminComponent
} from './view/config/etat-etape-campagne-admin/view-admin/etat-etape-campagne-view-admin.component';
import {
    EtatEtapeCampagneListAdminComponent
} from './view/config/etat-etape-campagne-admin/list-admin/etat-etape-campagne-list-admin.component';
import {EtatEtapeCampagneAdminComponent} from './view/config/etat-etape-campagne-admin/etat-etape-campagne-admin.component';
import {EtatCampagneCreateAdminComponent} from './view/config/etat-campagne-admin/create-admin/etat-campagne-create-admin.component';
import {EtatCampagneEditAdminComponent} from './view/config/etat-campagne-admin/edit-admin/etat-campagne-edit-admin.component';
import {EtatCampagneViewAdminComponent} from './view/config/etat-campagne-admin/view-admin/etat-campagne-view-admin.component';
import {EtatCampagneListAdminComponent} from './view/config/etat-campagne-admin/list-admin/etat-campagne-list-admin.component';
import {EtatCampagneAdminComponent} from './view/config/etat-campagne-admin/etat-campagne-admin.component';
import {
    IdentifiantRechercheCreateAdminComponent
} from './view/referentiel/identifiant-recherche-admin/create-admin/identifiant-recherche-create-admin.component';
import {
    IdentifiantRechercheEditAdminComponent
} from './view/referentiel/identifiant-recherche-admin/edit-admin/identifiant-recherche-edit-admin.component';
import {
    IdentifiantRechercheViewAdminComponent
} from './view/referentiel/identifiant-recherche-admin/view-admin/identifiant-recherche-view-admin.component';
import {
    IdentifiantRechercheListAdminComponent
} from './view/referentiel/identifiant-recherche-admin/list-admin/identifiant-recherche-list-admin.component';
import {IdentifiantRechercheAdminComponent} from './view/referentiel/identifiant-recherche-admin/identifiant-recherche-admin.component';
import {
    TypeInstrumentsEtDispositifsIrdCreateAdminComponent
} from './view/referentiel/type-instr-dispo-ird-admin/create-admin/type-instruments-et-dispositifs-ird-create-admin.component';
import {
    TypeInstrumentsEtDispositifsIrdEditAdminComponent
} from './view/referentiel/type-instr-dispo-ird-admin/edit-admin/type-instruments-et-dispositifs-ird-edit-admin.component';
import {
    TypeInstrumentsEtDispositifsIrdViewAdminComponent
} from './view/referentiel/type-instr-dispo-ird-admin/view-admin/type-instruments-et-dispositifs-ird-view-admin.component';
import {
    TypeInstrumentsEtDispositifsIrdListAdminComponent
} from './view/referentiel/type-instr-dispo-ird-admin/list-admin/type-instruments-et-dispositifs-ird-list-admin.component';
import {
    TypeInstrumentsEtDispositifsIrdAdminComponent
} from './view/referentiel/type-instr-dispo-ird-admin/type-instruments-et-dispositifs-ird-admin.component';
import {
    PubliquePrincipalCreateAdminComponent
} from './view/referentiel/publique-principal-admin/create-admin/publique-principal-create-admin.component';
import {
    PubliquePrincipalEditAdminComponent
} from './view/referentiel/publique-principal-admin/edit-admin/publique-principal-edit-admin.component';
import {
    PubliquePrincipalViewAdminComponent
} from './view/referentiel/publique-principal-admin/view-admin/publique-principal-view-admin.component';
import {
    PubliquePrincipalListAdminComponent
} from './view/referentiel/publique-principal-admin/list-admin/publique-principal-list-admin.component';
import {PubliquePrincipalAdminComponent} from './view/referentiel/publique-principal-admin/publique-principal-admin.component';
import {DoctorantCreateAdminComponent} from './view/formulaire/doctorant-admin/create-admin/doctorant-create-admin.component';
import {DoctorantEditAdminComponent} from './view/formulaire/doctorant-admin/edit-admin/doctorant-edit-admin.component';
import {DoctorantViewAdminComponent} from './view/formulaire/doctorant-admin/view-admin/doctorant-view-admin.component';
import {DoctorantListAdminComponent} from './view/formulaire/doctorant-admin/list-admin/doctorant-list-admin.component';
import {DoctorantAdminComponent} from './view/formulaire/doctorant-admin/doctorant-admin.component';
import {ObjetGlobalCreateAdminComponent} from './view/referentiel/objet-global-admin/create-admin/objet-global-create-admin.component';
import {ObjetGlobalEditAdminComponent} from './view/referentiel/objet-global-admin/edit-admin/objet-global-edit-admin.component';
import {ObjetGlobalViewAdminComponent} from './view/referentiel/objet-global-admin/view-admin/objet-global-view-admin.component';
import {ObjetGlobalListAdminComponent} from './view/referentiel/objet-global-admin/list-admin/objet-global-list-admin.component';
import {ObjetGlobalAdminComponent} from './view/referentiel/objet-global-admin/objet-global-admin.component';
import {
    ModaliteFormationContinueCreateAdminComponent
} from './view/referentiel/modalite-formation-continue-admin/create-admin/modalite-formation-continue-create-admin.component';
import {
    ModaliteFormationContinueEditAdminComponent
} from './view/referentiel/modalite-formation-continue-admin/edit-admin/modalite-formation-continue-edit-admin.component';
import {
    ModaliteFormationContinueViewAdminComponent
} from './view/referentiel/modalite-formation-continue-admin/view-admin/modalite-formation-continue-view-admin.component';
import {
    ModaliteFormationContinueListAdminComponent
} from './view/referentiel/modalite-formation-continue-admin/list-admin/modalite-formation-continue-list-admin.component';
import {
    ModaliteFormationContinueAdminComponent
} from './view/referentiel/modalite-formation-continue-admin/modalite-formation-continue-admin.component';
import {
    FormatRencontreCreateAdminComponent
} from './view/formulaire/format-rencontre-admin/create-admin/format-rencontre-create-admin.component';
import {FormatRencontreEditAdminComponent} from './view/formulaire/format-rencontre-admin/edit-admin/format-rencontre-edit-admin.component';
import {FormatRencontreViewAdminComponent} from './view/formulaire/format-rencontre-admin/view-admin/format-rencontre-view-admin.component';
import {FormatRencontreListAdminComponent} from './view/formulaire/format-rencontre-admin/list-admin/format-rencontre-list-admin.component';
import {FormatRencontreAdminComponent} from './view/formulaire/format-rencontre-admin/format-rencontre-admin.component';
import {VilleCreateAdminComponent} from './view/referentiel/ville-admin/create-admin/ville-create-admin.component';
import {VilleEditAdminComponent} from './view/referentiel/ville-admin/edit-admin/ville-edit-admin.component';
import {VilleViewAdminComponent} from './view/referentiel/ville-admin/view-admin/ville-view-admin.component';
import {VilleListAdminComponent} from './view/referentiel/ville-admin/list-admin/ville-list-admin.component';
import {VilleAdminComponent} from './view/referentiel/ville-admin/ville-admin.component';
import {ContinentCreateAdminComponent} from './view/referentiel/continent-admin/create-admin/continent-create-admin.component';
import {ContinentEditAdminComponent} from './view/referentiel/continent-admin/edit-admin/continent-edit-admin.component';
import {ContinentViewAdminComponent} from './view/referentiel/continent-admin/view-admin/continent-view-admin.component';
import {ContinentListAdminComponent} from './view/referentiel/continent-admin/list-admin/continent-list-admin.component';
import {ContinentAdminComponent} from './view/referentiel/continent-admin/continent-admin.component';
import {
    FournisseurAppelProjetRechercheCreateAdminComponent
} from './view/formulaire/four-appel-prj-recherche-admin/create-admin/four-appel-prj-recherche-create-admin.component';
import {
    FournisseurAppelProjetRechercheEditAdminComponent
} from './view/formulaire/four-appel-prj-recherche-admin/edit-admin/four-appel-prj-recherche-edit-admin.component';
import {
    FournisseurAppelProjetRechercheViewAdminComponent
} from './view/formulaire/four-appel-prj-recherche-admin/view-admin/four-appel-prj-recherche-view-admin.component';
import {
    FournisseurAppelProjetRechercheListAdminComponent
} from './view/formulaire/four-appel-prj-recherche-admin/list-admin/four-appel-prj-recherche-list-admin.component';
import {
    FournisseurAppelProjetRechercheAdminComponent
} from './view/formulaire/four-appel-prj-recherche-admin/four-appel-prj-recherche-admin.component';
import {ModaliteCreateAdminComponent} from './view/referentiel/modalite-admin/create-admin/modalite-create-admin.component';
import {ModaliteEditAdminComponent} from './view/referentiel/modalite-admin/edit-admin/modalite-edit-admin.component';
import {ModaliteViewAdminComponent} from './view/referentiel/modalite-admin/view-admin/modalite-view-admin.component';
import {ModaliteListAdminComponent} from './view/referentiel/modalite-admin/list-admin/modalite-list-admin.component';
import {ModaliteAdminComponent} from './view/referentiel/modalite-admin/modalite-admin.component';
import {
    CaracterisationCreateAdminComponent
} from './view/referentiel/caracterisation-admin/create-admin/caracterisation-create-admin.component';
import {CaracterisationEditAdminComponent} from './view/referentiel/caracterisation-admin/edit-admin/caracterisation-edit-admin.component';
import {CaracterisationViewAdminComponent} from './view/referentiel/caracterisation-admin/view-admin/caracterisation-view-admin.component';
import {CaracterisationListAdminComponent} from './view/referentiel/caracterisation-admin/list-admin/caracterisation-list-admin.component';
import {CaracterisationAdminComponent} from './view/referentiel/caracterisation-admin/caracterisation-admin.component';
import {
    TypeReclamationCreateAdminComponent
} from './view/referentiel/type-reclamation-admin/create-admin/type-reclamation-create-admin.component';
import {
    TypeReclamationEditAdminComponent
} from './view/referentiel/type-reclamation-admin/edit-admin/type-reclamation-edit-admin.component';
import {
    TypeReclamationViewAdminComponent
} from './view/referentiel/type-reclamation-admin/view-admin/type-reclamation-view-admin.component';
import {
    TypeReclamationListAdminComponent
} from './view/referentiel/type-reclamation-admin/list-admin/type-reclamation-list-admin.component';
import {TypeReclamationAdminComponent} from './view/referentiel/type-reclamation-admin/type-reclamation-admin.component';
import {
    CommunauteSavoirCreateAdminComponent
} from './view/referentiel/communaute-savoir-admin/create-admin/communaute-savoir-create-admin.component';
import {
    CommunauteSavoirEditAdminComponent
} from './view/referentiel/communaute-savoir-admin/edit-admin/communaute-savoir-edit-admin.component';
import {
    CommunauteSavoirViewAdminComponent
} from './view/referentiel/communaute-savoir-admin/view-admin/communaute-savoir-view-admin.component';
import {
    CommunauteSavoirListAdminComponent
} from './view/referentiel/communaute-savoir-admin/list-admin/communaute-savoir-list-admin.component';
import {CommunauteSavoirAdminComponent} from './view/referentiel/communaute-savoir-admin/communaute-savoir-admin.component';
import {
    TypeEnseignementDispenseCreateAdminComponent
} from './view/referentiel/type-enseig-disp-admin/create-admin/type-enseignement-dispense-create-admin.component';
import {
    TypeEnseignementDispenseEditAdminComponent
} from './view/referentiel/type-enseig-disp-admin/edit-admin/type-enseignement-dispense-edit-admin.component';
import {
    TypeEnseignementDispenseViewAdminComponent
} from './view/referentiel/type-enseig-disp-admin/view-admin/type-enseignement-dispense-view-admin.component';
import {
    TypeEnseignementDispenseListAdminComponent
} from './view/referentiel/type-enseig-disp-admin/list-admin/type-enseignement-dispense-list-admin.component';
import {
    TypeEnseignementDispenseAdminComponent
} from './view/referentiel/type-enseig-disp-admin/type-enseignement-dispense-admin.component';
import {
    EtablissementProjetCreateAdminComponent
} from './view/formulaire/etablissement-projet-admin/create-admin/etablissement-projet-create-admin.component';
import {
    EtablissementProjetEditAdminComponent
} from './view/formulaire/etablissement-projet-admin/edit-admin/etablissement-projet-edit-admin.component';
import {
    EtablissementProjetViewAdminComponent
} from './view/formulaire/etablissement-projet-admin/view-admin/etablissement-projet-view-admin.component';
import {
    EtablissementProjetListAdminComponent
} from './view/formulaire/etablissement-projet-admin/list-admin/etablissement-projet-list-admin.component';
import {EtablissementProjetAdminComponent} from './view/formulaire/etablissement-projet-admin/etablissement-projet-admin.component';
import {EnseignementCreateAdminComponent} from './view/formulaire/enseignement-admin/create-admin/enseignement-create-admin.component';
import {EnseignementEditAdminComponent} from './view/formulaire/enseignement-admin/edit-admin/enseignement-edit-admin.component';
import {EnseignementViewAdminComponent} from './view/formulaire/enseignement-admin/view-admin/enseignement-view-admin.component';
import {EnseignementListAdminComponent} from './view/formulaire/enseignement-admin/list-admin/enseignement-list-admin.component';
import {EnseignementAdminComponent} from './view/formulaire/enseignement-admin/enseignement-admin.component';
import {BourseCreateAdminComponent} from './view/formulaire/bourse-admin/create-admin/bourse-create-admin.component';
import {BourseEditAdminComponent} from './view/formulaire/bourse-admin/edit-admin/bourse-edit-admin.component';
import {BourseViewAdminComponent} from './view/formulaire/bourse-admin/view-admin/bourse-view-admin.component';
import {BourseListAdminComponent} from './view/formulaire/bourse-admin/list-admin/bourse-list-admin.component';
import {BourseAdminComponent} from './view/formulaire/bourse-admin/bourse-admin.component';
import {
    EntiteAdministrativeCreateAdminComponent
} from './view/referentiel/entite-administrative-admin/create-admin/entite-administrative-create-admin.component';
import {
    EntiteAdministrativeEditAdminComponent
} from './view/referentiel/entite-administrative-admin/edit-admin/entite-administrative-edit-admin.component';
import {
    EntiteAdministrativeViewAdminComponent
} from './view/referentiel/entite-administrative-admin/view-admin/entite-administrative-view-admin.component';
import {
    EntiteAdministrativeListAdminComponent
} from './view/referentiel/entite-administrative-admin/list-admin/entite-administrative-list-admin.component';
import {EntiteAdministrativeAdminComponent} from './view/referentiel/entite-administrative-admin/entite-administrative-admin.component';
import {GestionEquipeCreateAdminComponent} from './view/formulaire/gestion-equipe-admin/create-admin/gestion-equipe-create-admin.component';
import {GestionEquipeEditAdminComponent} from './view/formulaire/gestion-equipe-admin/edit-admin/gestion-equipe-edit-admin.component';
import {GestionEquipeViewAdminComponent} from './view/formulaire/gestion-equipe-admin/view-admin/gestion-equipe-view-admin.component';
import {GestionEquipeListAdminComponent} from './view/formulaire/gestion-equipe-admin/list-admin/gestion-equipe-list-admin.component';
import {GestionEquipeAdminComponent} from './view/formulaire/gestion-equipe-admin/gestion-equipe-admin.component';
import {DistinctionCreateAdminComponent} from './view/formulaire/distinction-admin/create-admin/distinction-create-admin.component';
import {DistinctionEditAdminComponent} from './view/formulaire/distinction-admin/edit-admin/distinction-edit-admin.component';
import {DistinctionViewAdminComponent} from './view/formulaire/distinction-admin/view-admin/distinction-view-admin.component';
import {DistinctionListAdminComponent} from './view/formulaire/distinction-admin/list-admin/distinction-list-admin.component';
import {DistinctionAdminComponent} from './view/formulaire/distinction-admin/distinction-admin.component';
import {
    NiveauFormationCreateAdminComponent
} from './view/referentiel/niveau-formation-admin/create-admin/niveau-formation-create-admin.component';
import {
    NiveauFormationEditAdminComponent
} from './view/referentiel/niveau-formation-admin/edit-admin/niveau-formation-edit-admin.component';
import {
    NiveauFormationViewAdminComponent
} from './view/referentiel/niveau-formation-admin/view-admin/niveau-formation-view-admin.component';
import {
    NiveauFormationListAdminComponent
} from './view/referentiel/niveau-formation-admin/list-admin/niveau-formation-list-admin.component';
import {NiveauFormationAdminComponent} from './view/referentiel/niveau-formation-admin/niveau-formation-admin.component';
import {
    CultureScientifiqueOutilPedagogiqueCreateAdminComponent
} from './view/formulaire/culture-sci-outil-peda-admin/create-admin/culture-sci-outil-peda-create-admin';
import {
    CultureScientifiqueOutilPedagogiqueEditAdminComponent
} from './view/formulaire/culture-sci-outil-peda-admin/edit-admin/culture-sci-outil-peda-edit-admin';
import {
    CultureScientifiqueOutilPedagogiqueViewAdminComponent
} from './view/formulaire/culture-sci-outil-peda-admin/view-admin/culture-sci-outil-peda-view-admin';
import {CultureSciOutilPedaListAdmin} from './view/formulaire/culture-sci-outil-peda-admin/list-admin/culture-sci-outil-peda-list-admin';
import {CultureSciOutilPedaAdmin} from './view/formulaire/culture-sci-outil-peda-admin/culture-sci-outil-peda-admin';
import {CategorieFaqCreateAdminComponent} from './view/formulaire/categorie-faq-admin/create-admin/categorie-faq-create-admin.component';
import {CategorieFaqEditAdminComponent} from './view/formulaire/categorie-faq-admin/edit-admin/categorie-faq-edit-admin.component';
import {CategorieFaqViewAdminComponent} from './view/formulaire/categorie-faq-admin/view-admin/categorie-faq-view-admin.component';
import {CategorieFaqListAdminComponent} from './view/formulaire/categorie-faq-admin/list-admin/categorie-faq-list-admin.component';
import {CategorieFaqAdminComponent} from './view/formulaire/categorie-faq-admin/categorie-faq-admin.component';
import {
    TemplateOuvertureCreateAdminComponent
} from './view/referentiel/template-ouverture-admin/create-admin/template-ouverture-create-admin.component';
import {
    TemplateOuvertureEditAdminComponent
} from './view/referentiel/template-ouverture-admin/edit-admin/template-ouverture-edit-admin.component';
import {
    TemplateOuvertureViewAdminComponent
} from './view/referentiel/template-ouverture-admin/view-admin/template-ouverture-view-admin.component';
import {
    TemplateOuvertureListAdminComponent
} from './view/referentiel/template-ouverture-admin/list-admin/template-ouverture-list-admin.component';
import {TemplateOuvertureAdminComponent} from './view/referentiel/template-ouverture-admin/template-ouverture-admin.component';

import {StatutMasterCreateAdminComponent} from './view/referentiel/statut-master-admin/create-admin/statut-master-create-admin.component';
import {StatutMasterEditAdminComponent} from './view/referentiel/statut-master-admin/edit-admin/statut-master-edit-admin.component';
import {StatutMasterViewAdminComponent} from './view/referentiel/statut-master-admin/view-admin/statut-master-view-admin.component';
import {StatutMasterListAdminComponent} from './view/referentiel/statut-master-admin/list-admin/statut-master-list-admin.component';
import {StatutMasterAdminComponent} from './view/referentiel/statut-master-admin/statut-master-admin.component';
import {ReclamationCreateAdminComponent} from './view/formulaire/reclamation-admin/create-admin/reclamation-create-admin.component';
import {ReclamationEditAdminComponent} from './view/formulaire/reclamation-admin/edit-admin/reclamation-edit-admin.component';
import {ReclamationViewAdminComponent} from './view/formulaire/reclamation-admin/view-admin/reclamation-view-admin.component';
import {ReclamationListAdminComponent} from './view/formulaire/reclamation-admin/list-admin/reclamation-list-admin.component';
import {ReclamationAdminComponent} from './view/formulaire/reclamation-admin/reclamation-admin.component';
import {
    TypeExpertiseCreateAdminComponent
} from './view/referentiel/type-expertise-admin/create-admin/type-expertise-create-admin.component';
import {TypeExpertiseEditAdminComponent} from './view/referentiel/type-expertise-admin/edit-admin/type-expertise-edit-admin.component';
import {TypeExpertiseViewAdminComponent} from './view/referentiel/type-expertise-admin/view-admin/type-expertise-view-admin.component';
import {TypeExpertiseListAdminComponent} from './view/referentiel/type-expertise-admin/list-admin/type-expertise-list-admin.component';
import {TypeExpertiseAdminComponent} from './view/referentiel/type-expertise-admin/type-expertise-admin.component';
import {NationaliteCreateAdminComponent} from './view/referentiel/nationalite-admin/create-admin/nationalite-create-admin.component';
import {NationaliteEditAdminComponent} from './view/referentiel/nationalite-admin/edit-admin/nationalite-edit-admin.component';
import {NationaliteViewAdminComponent} from './view/referentiel/nationalite-admin/view-admin/nationalite-view-admin.component';
import {NationaliteListAdminComponent} from './view/referentiel/nationalite-admin/list-admin/nationalite-list-admin.component';
import {NationaliteAdminComponent} from './view/referentiel/nationalite-admin/nationalite-admin.component';
import {
    DepartementScientifiqueCreateAdminComponent
} from './view/formulaire/departement-scientifique-admin/create-admin/departement-scientifique-create-admin.component';
import {
    DepartementScientifiqueEditAdminComponent
} from './view/formulaire/departement-scientifique-admin/edit-admin/departement-scientifique-edit-admin.component';
import {
    DepartementScientifiqueViewAdminComponent
} from './view/formulaire/departement-scientifique-admin/view-admin/departement-scientifique-view-admin.component';
import {
    DepartementScientifiqueListAdminComponent
} from './view/formulaire/departement-scientifique-admin/list-admin/departement-scientifique-list-admin.component';
import {
    DepartementScientifiqueAdminComponent
} from './view/formulaire/departement-scientifique-admin/departement-scientifique-admin.component';
import {NiveauEtudeCreateAdminComponent} from './view/referentiel/niveau-etude-admin/create-admin/niveau-etude-create-admin.component';
import {NiveauEtudeEditAdminComponent} from './view/referentiel/niveau-etude-admin/edit-admin/niveau-etude-edit-admin.component';
import {NiveauEtudeViewAdminComponent} from './view/referentiel/niveau-etude-admin/view-admin/niveau-etude-view-admin.component';
import {NiveauEtudeListAdminComponent} from './view/referentiel/niveau-etude-admin/list-admin/niveau-etude-list-admin.component';
import {NiveauEtudeAdminComponent} from './view/referentiel/niveau-etude-admin/niveau-etude-admin.component';
import {TypeInstanceCreateAdminComponent} from './view/referentiel/type-instance-admin/create-admin/type-instance-create-admin.component';
import {TypeInstanceEditAdminComponent} from './view/referentiel/type-instance-admin/edit-admin/type-instance-edit-admin.component';
import {TypeInstanceViewAdminComponent} from './view/referentiel/type-instance-admin/view-admin/type-instance-view-admin.component';
import {TypeInstanceListAdminComponent} from './view/referentiel/type-instance-admin/list-admin/type-instance-list-admin.component';
import {TypeInstanceAdminComponent} from './view/referentiel/type-instance-admin/type-instance-admin.component';
import {NatureEtudeCreateAdminComponent} from './view/referentiel/nature-etude-admin/create-admin/nature-etude-create-admin.component';
import {NatureEtudeEditAdminComponent} from './view/referentiel/nature-etude-admin/edit-admin/nature-etude-edit-admin.component';
import {NatureEtudeViewAdminComponent} from './view/referentiel/nature-etude-admin/view-admin/nature-etude-view-admin.component';
import {NatureEtudeListAdminComponent} from './view/referentiel/nature-etude-admin/list-admin/nature-etude-list-admin.component';
import {NatureEtudeAdminComponent} from './view/referentiel/nature-etude-admin/nature-etude-admin.component';
import {
    DisciplineScientifiqueCreateAdminComponent
} from './view/referentiel/discipline-scientifique-admin/create-admin/discipline-scientifique-create-admin.component';
import {
    DisciplineScientifiqueEditAdminComponent
} from './view/referentiel/discipline-scientifique-admin/edit-admin/discipline-scientifique-edit-admin.component';
import {
    DisciplineScientifiqueViewAdminComponent
} from './view/referentiel/discipline-scientifique-admin/view-admin/discipline-scientifique-view-admin.component';
import {
    DisciplineScientifiqueListAdminComponent
} from './view/referentiel/discipline-scientifique-admin/list-admin/discipline-scientifique-list-admin.component';
import {
    DisciplineScientifiqueAdminComponent
} from './view/referentiel/discipline-scientifique-admin/discipline-scientifique-admin.component';
import {ContexteCreateAdminComponent} from './view/referentiel/contexte-admin/create-admin/contexte-create-admin.component';
import {ContexteEditAdminComponent} from './view/referentiel/contexte-admin/edit-admin/contexte-edit-admin.component';
import {ContexteViewAdminComponent} from './view/referentiel/contexte-admin/view-admin/contexte-view-admin.component';
import {ContexteListAdminComponent} from './view/referentiel/contexte-admin/list-admin/contexte-list-admin.component';
import {ContexteAdminComponent} from './view/referentiel/contexte-admin/contexte-admin.component';
import {
    EvaluationEncadrementCreateAdminComponent
} from './view/referentiel/evaluation-encadrement-admin/create-admin/evaluation-encadrement-create-admin.component';
import {
    EvaluationEncadrementEditAdminComponent
} from './view/referentiel/evaluation-encadrement-admin/edit-admin/evaluation-encadrement-edit-admin.component';
import {
    EvaluationEncadrementViewAdminComponent
} from './view/referentiel/evaluation-encadrement-admin/view-admin/evaluation-encadrement-view-admin.component';
import {
    EvaluationEncadrementListAdminComponent
} from './view/referentiel/evaluation-encadrement-admin/list-admin/evaluation-encadrement-list-admin.component';
import {EvaluationEncadrementAdminComponent} from './view/referentiel/evaluation-encadrement-admin/evaluation-encadrement-admin.component';
import {MasterCreateAdminComponent} from './view/referentiel/master-admin/create-admin/master-create-admin.component';
import {MasterEditAdminComponent} from './view/referentiel/master-admin/edit-admin/master-edit-admin.component';
import {MasterViewAdminComponent} from './view/referentiel/master-admin/view-admin/master-view-admin.component';
import {MasterListAdminComponent} from './view/referentiel/master-admin/list-admin/master-list-admin.component';
import {MasterAdminComponent} from './view/referentiel/master-admin/master-admin.component';
import {TypeSavoirCreateAdminComponent} from './view/referentiel/type-savoir-admin/create-admin/type-savoir-create-admin.component';
import {TypeSavoirEditAdminComponent} from './view/referentiel/type-savoir-admin/edit-admin/type-savoir-edit-admin.component';
import {TypeSavoirViewAdminComponent} from './view/referentiel/type-savoir-admin/view-admin/type-savoir-view-admin.component';
import {TypeSavoirListAdminComponent} from './view/referentiel/type-savoir-admin/list-admin/type-savoir-list-admin.component';
import {TypeSavoirAdminComponent} from './view/referentiel/type-savoir-admin/type-savoir-admin.component';
import {
    ResponsabilitePedagogiqueEcoleDoctoraleCreateAdminComponent
} from './view/formulaire/resp-ped-ecole-doctorale-admin/create-admin/resp-ped-ecole-doctorale-create-admin.component';
import {
    ResponsabilitePedagogiqueEcoleDoctoraleEditAdminComponent
} from './view/formulaire/resp-ped-ecole-doctorale-admin/edit-admin/resp-ped-ecole-doctorale-edit-admin.component';
import {
    ResponsabilitePedagogiqueEcoleDoctoraleViewAdminComponent
} from './view/formulaire/resp-ped-ecole-doctorale-admin/view-admin/resp-ped-ecole-doctorale-view-admin.component';
import {
    ResponsabilitePedagogiqueEcoleDoctoraleListAdminComponent
} from './view/formulaire/resp-ped-ecole-doctorale-admin/list-admin/resp-ped-ecole-doctorale-list-admin.component';
import {
    RespPedEcoleDoctoraleAdminComponent
} from './view/formulaire/resp-ped-ecole-doctorale-admin/resp-ped-ecole-doctorale-admin.component';
import {
    DomaineScientifiqueCreateAdminComponent
} from './view/formulaire/domaine-scientifique-admin/create-admin/domaine-scientifique-create-admin.component';
import {
    DomaineScientifiqueEditAdminComponent
} from './view/formulaire/domaine-scientifique-admin/edit-admin/domaine-scientifique-edit-admin.component';
import {
    DomaineScientifiqueViewAdminComponent
} from './view/formulaire/domaine-scientifique-admin/view-admin/domaine-scientifique-view-admin.component';
import {
    DomaineScientifiqueListAdminComponent
} from './view/formulaire/domaine-scientifique-admin/list-admin/domaine-scientifique-list-admin.component';
import {DomaineScientifiqueAdminComponent} from './view/formulaire/domaine-scientifique-admin/domaine-scientifique-admin.component';
import {
    TypeEntiteAdministrativeCreateAdminComponent
} from './view/referentiel/type-entite-administrative-admin/create-admin/type-entite-administrative-create-admin.component';
import {
    TypeEntiteAdministrativeEditAdminComponent
} from './view/referentiel/type-entite-administrative-admin/edit-admin/type-entite-administrative-edit-admin.component';
import {
    TypeEntiteAdministrativeViewAdminComponent
} from './view/referentiel/type-entite-administrative-admin/view-admin/type-entite-administrative-view-admin.component';
import {
    TypeEntiteAdministrativeListAdminComponent
} from './view/referentiel/type-entite-administrative-admin/list-admin/type-entite-administrative-list-admin.component';
import {
    TypeEntiteAdministrativeAdminComponent
} from './view/referentiel/type-entite-administrative-admin/type-entite-administrative-admin.component';
import {CorpsCreateAdminComponent} from './view/referentiel/corps-admin/create-admin/corps-create-admin.component';
import {CorpsEditAdminComponent} from './view/referentiel/corps-admin/edit-admin/corps-edit-admin.component';
import {CorpsViewAdminComponent} from './view/referentiel/corps-admin/view-admin/corps-view-admin.component';
import {CorpsListAdminComponent} from './view/referentiel/corps-admin/list-admin/corps-list-admin.component';
import {CorpsAdminComponent} from './view/referentiel/corps-admin/corps-admin.component';

import {
    ModaliteEtudeCreateAdminComponent
} from './view/referentiel/modalite-etude-admin/create-admin/modalite-etude-create-admin.component';
import {ModaliteEtudeEditAdminComponent} from './view/referentiel/modalite-etude-admin/edit-admin/modalite-etude-edit-admin.component';
import {ModaliteEtudeViewAdminComponent} from './view/referentiel/modalite-etude-admin/view-admin/modalite-etude-view-admin.component';
import {ModaliteEtudeListAdminComponent} from './view/referentiel/modalite-etude-admin/list-admin/modalite-etude-list-admin.component';
import {ModaliteEtudeAdminComponent} from './view/referentiel/modalite-etude-admin/modalite-etude-admin.component';
import {
    TemplateRappelCreateAdminComponent
} from './view/referentiel/template-rappel-admin/create-admin/template-rappel-create-admin.component';
import {TemplateRappelEditAdminComponent} from './view/referentiel/template-rappel-admin/edit-admin/template-rappel-edit-admin.component';
import {TemplateRappelViewAdminComponent} from './view/referentiel/template-rappel-admin/view-admin/template-rappel-view-admin.component';
import {TemplateRappelListAdminComponent} from './view/referentiel/template-rappel-admin/list-admin/template-rappel-list-admin.component';
import {TemplateRappelAdminComponent} from './view/referentiel/template-rappel-admin/template-rappel-admin.component';
import {TypeOutilCreateAdminComponent} from './view/referentiel/type-outil-admin/create-admin/type-outil-create-admin.component';
import {TypeOutilEditAdminComponent} from './view/referentiel/type-outil-admin/edit-admin/type-outil-edit-admin.component';
import {TypeOutilViewAdminComponent} from './view/referentiel/type-outil-admin/view-admin/type-outil-view-admin.component';
import {TypeOutilListAdminComponent} from './view/referentiel/type-outil-admin/list-admin/type-outil-list-admin.component';
import {TypeOutilAdminComponent} from './view/referentiel/type-outil-admin/type-outil-admin.component';
import {FaqCreateAdminComponent} from './view/formulaire/faq-admin/create-admin/faq-create-admin.component';
import {FaqEditAdminComponent} from './view/formulaire/faq-admin/edit-admin/faq-edit-admin.component';
import {FaqViewAdminComponent} from './view/formulaire/faq-admin/view-admin/faq-view-admin.component';
import {FaqListAdminComponent} from './view/formulaire/faq-admin/list-admin/faq-list-admin.component';
import {FaqAdminComponent} from './view/formulaire/faq-admin/faq-admin.component';
import {ChercheurCreateAdminComponent} from './view/formulaire/chercheur-admin/create-admin/chercheur-create-admin.component';
import {ChercheurEditAdminComponent} from './view/formulaire/chercheur-admin/edit-admin/chercheur-edit-admin.component';
import {ChercheurViewAdminComponent} from './view/formulaire/chercheur-admin/view-admin/chercheur-view-admin.component';
import {ChercheurListAdminComponent} from './view/formulaire/chercheur-admin/list-admin/chercheur-list-admin.component';
import {ChercheurAdminComponent} from './view/formulaire/chercheur-admin/chercheur-admin.component';
import {
    ExpertiseScientifiqueCreateAdminComponent
} from './view/formulaire/expertise-scientifique-admin/create-admin/expertise-scientifique-create-admin.component';
import {
    ExpertiseScientifiqueEditAdminComponent
} from './view/formulaire/expertise-scientifique-admin/edit-admin/expertise-scientifique-edit-admin.component';
import {
    ExpertiseScientifiqueViewAdminComponent
} from './view/formulaire/expertise-scientifique-admin/view-admin/expertise-scientifique-view-admin.component';
import {
    ExpertiseScientifiqueListAdminComponent
} from './view/formulaire/expertise-scientifique-admin/list-admin/expertise-scientifique-list-admin.component';
import {ExpertiseScientifiqueAdminComponent} from './view/formulaire/expertise-scientifique-admin/expertise-scientifique-admin.component';
import {CampagneCreateAdminComponent} from './view/formulaire/campagne-admin/create-admin/campagne-create-admin.component';
import {CampagneEditAdminComponent} from './view/formulaire/campagne-admin/edit-admin/campagne-edit-admin.component';
import {CampagneViewAdminComponent} from './view/formulaire/campagne-admin/view-admin/campagne-view-admin.component';
import {CampagneListAdminComponent} from './view/formulaire/campagne-admin/list-admin/campagne-list-admin.component';
import {CampagneAdminComponent} from './view/formulaire/campagne-admin/campagne-admin.component';
import {
    EtatCampagneChercheurCreateAdminComponent
} from './view/config/etat-campagne-chercheur-admin/create-admin/etat-campagne-chercheur-create-admin.component';
import {
    EtatCampagneChercheurEditAdminComponent
} from './view/config/etat-campagne-chercheur-admin/edit-admin/etat-campagne-chercheur-edit-admin.component';
import {
    EtatCampagneChercheurViewAdminComponent
} from './view/config/etat-campagne-chercheur-admin/view-admin/etat-campagne-chercheur-view-admin.component';
import {
    EtatCampagneChercheurListAdminComponent
} from './view/config/etat-campagne-chercheur-admin/list-admin/etat-campagne-chercheur-list-admin.component';
import {EtatCampagneChercheurAdminComponent} from './view/config/etat-campagne-chercheur-admin/etat-campagne-chercheur-admin.component';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {FaqVisualisationAdminComponent} from './view/formulaire/faq-visualisation/faq-chercheur.component';
import {AccordionModule} from 'primeng/accordion';
import {PickListModule} from 'primeng/picklist';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {EmailRelanceComponent} from './view/formulaire/campagne-admin/email-relance/email-relance.component';
import {
    EmailRelanceDetailsComponent
} from './view/formulaire/campagne-admin/email-relance/email-relance-details/email-relance-details.component';
import {EmailRappelComponent} from './view/formulaire/campagne-admin/email-rappel/email-rappel.component';
import {
    EmailRappelDetailsComponent
} from './view/formulaire/campagne-admin/email-rappel/email-rappel-details/email-rappel-details.component';
import {
    CampagneSendEmailRappelComponent
} from './view/formulaire/campagne-admin/email-rappel/send-email-rappel/campagne-send-email-rappel.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {
    CampagneSendEmailRelanceComponent
} from './view/formulaire/campagne-admin/email-relance/send-email-relance/campagne-send-email-relance.component';
import {SwitchChercheurAdminComponent} from './view/formulaire/chercheur-admin/switch_chercheur/switch-chercheur-admin.component';
import {
    InstrumentIrdCreateAdminComponent
} from './view/referentiel/instrument-ird-admin/create-admin/instrument-ird-create-admin.component';
import {InstrumentIrdListAdminComponent} from './view/referentiel/instrument-ird-admin/list-admin/instrument-ird-list-admin.component';
import {InstrumentIrdViewAdminComponent} from './view/referentiel/instrument-ird-admin/view-admin/instrument-ird-view-admin.component';
import {InstrumentIrdEditAdminComponent} from './view/referentiel/instrument-ird-admin/edit-admin/instrument-ird-edit-admin.component';
import {InstrumentIrdAdminComponent} from './view/referentiel/instrument-ird-admin/instrument-ird-admin.component';
import {
    TypeInstrumentIrdCreateAdminComponent
} from './view/referentiel/type-instrument-ird-admin/create-admin/type-instrument-ird-create-admin.component';
import {
    TypeInstrumentIrdListAdminComponent
} from './view/referentiel/type-instrument-ird-admin/list-admin/type-instrument-ird-list-admin.component';
import {
    TypeInstrumentIrdViewAdminComponent
} from './view/referentiel/type-instrument-ird-admin/view-admin/type-instrument-ird-view-admin.component';
import {
    TypeInstrumentIrdEditAdminComponent
} from './view/referentiel/type-instrument-ird-admin/edit-admin/type-instrument-ird-edit-admin.component';
import {TypeInstrumentIrdAdminComponent} from './view/referentiel/type-instrument-ird-admin/type-instrument-ird-admin.component';
import {StructureIrdCreateAdminComponent} from './view/referentiel/structure-ird-admin/create-admin/structure-ird-create-admin.component';
import {StructureIrdListAdminComponent} from './view/referentiel/structure-ird-admin/list-admin/structure-ird-list-admin.component';
import {StructureIrdViewAdminComponent} from './view/referentiel/structure-ird-admin/view-admin/structure-ird-view-admin.component';
import {StructureIrdEditAdminComponent} from './view/referentiel/structure-ird-admin/edit-admin/structure-ird-edit-admin.component';
import {StructureIrdAdminComponent} from './view/referentiel/structure-ird-admin/structure-ird-admin.component';
import {TypePubliqueCreateAdminComponent} from './view/referentiel/type-publique-admin/create-admin/type-publique-create-admin.component';
import {TypePubliqueViewAdminComponent} from './view/referentiel/type-publique-admin/view-admin/type-publique-view-admin.component';
import {LangueEditAdminComponent} from './view/referentiel/langue-admin/edit-admin/langue-edit-admin.component';
import {LangueAdminComponent} from './view/referentiel/langue-admin/langue-admin.component';
import {
    EncadrementDoctorantCreateAdminComponent
} from './view/formulaire/encadrement-doctorant-admin/create-admin/encadrement-doctorant-create-admin.component';
import {
    EncadrementDoctorantEditAdminComponent
} from './view/formulaire/encadrement-doctorant-admin/edit-admin/encadrement-doctorant-edit-admin.component';
import {
    EncadrementDoctorantViewAdminComponent
} from './view/formulaire/encadrement-doctorant-admin/view-admin/encadrement-doctorant-view-admin.component';
import {TypePubliqueListAdminComponent} from './view/referentiel/type-publique-admin/list-admin/type-publique-list-admin.component';
import {TypePubliqueEditAdminComponent} from './view/referentiel/type-publique-admin/edit-admin/type-publique-edit-admin.component';
import {TypePubliqueAdminComponent} from './view/referentiel/type-publique-admin/type-publique-admin.component';
import {LangueCreateAdminComponent} from './view/referentiel/langue-admin/create-admin/langue-create-admin.component';
import {LangueListAdminComponent} from './view/referentiel/langue-admin/list-admin/langue-list-admin.component';
import {LangueViewAdminComponent} from './view/referentiel/langue-admin/view-admin/langue-view-admin.component';
import {
    TypeParticipationCreateAdminComponent
} from './view/referentiel/type-participation-admin/create-admin/type-participation-create-admin.component';
import {
    TypeParticipationListAdminComponent
} from './view/referentiel/type-participation-admin/list-admin/type-participation-list-admin.component';
import {
    TypeParticipationViewAdminComponent
} from './view/referentiel/type-participation-admin/view-admin/type-participation-view-admin.component';
import {
    TypeParticipationEditAdminComponent
} from './view/referentiel/type-participation-admin/edit-admin/type-participation-edit-admin.component';
import {TypeParticipationAdminComponent} from './view/referentiel/type-participation-admin/type-participation-admin.component';
import {ToolsModule} from '../tools/tools.module';
import {GestionEquipeListAdminModule} from './view/formulaire/gestion-equipe-admin/list-admin/gestion-equipe-list-admin.module';
import {TooltipModule} from 'primeng/tooltip';
import {I18NextModule} from 'angular-i18next';
import {SharedModule} from '../shared/shared.module';
import {
    SemanticRelationshipCreateAdminComponent
} from './view/referentiel/semantic-relationship-admin/create-admin/semantic-relationship-create-admin.component';
import {
    SemanticRelationshipListAdminComponent
} from './view/referentiel/semantic-relationship-admin/list-admin/semantic-relationship-list-admin.component';
import {
    SemanticRelationshipViewAdminComponent
} from './view/referentiel/semantic-relationship-admin/view-admin/semantic-relationship-view-admin.component';
import {
    SemanticRelationshipEditAdminComponent
} from './view/referentiel/semantic-relationship-admin/edit-admin/semantic-relationship-edit-admin.component';
import {SemanticRelationshipAdminComponent} from './view/referentiel/semantic-relationship-admin/semantic-relationship-admin.component';
import {KeyWordCreateAdminComponent} from './view/referentiel/key-word-admin/create-admin/key-word-create-admin.component';
import {KeyWordListAdminComponent} from './view/referentiel/key-word-admin/list-admin/key-word-list-admin.component';
import {KeyWordViewAdminComponent} from './view/referentiel/key-word-admin/view-admin/key-word-view-admin.component';
import {KeyWordEditAdminComponent} from './view/referentiel/key-word-admin/edit-admin/key-word-edit-admin.component';
import {KeyWordAdminComponent} from './view/referentiel/key-word-admin/key-word-admin.component';
import {
    DisciplineScientifiqueErcCreateAdminComponent
} from './view/referentiel/discipline-scientifique-erc-admin/create-admin/discipline-scientifique-erc-create-admin.component';
import {
    DisciplineScientifiqueErcListAdminComponent
} from './view/referentiel/discipline-scientifique-erc-admin/list-admin/discipline-scientifique-erc-list-admin.component';
import {
    DisciplineScientifiqueErcViewAdminComponent
} from './view/referentiel/discipline-scientifique-erc-admin/view-admin/discipline-scientifique-erc-view-admin.component';
import {
    DisciplineScientifiqueErcEditAdminComponent
} from './view/referentiel/discipline-scientifique-erc-admin/edit-admin/discipline-scientifique-erc-edit-admin.component';
import {
    DisciplineScientifiqueErcAdminComponent
} from './view/referentiel/discipline-scientifique-erc-admin/discipline-scientifique-erc-admin.component';
import {
    StatutEcoleDoctoraleCreateAdminComponent
} from './view/referentiel/statut-ecole-doctorale-admin/create-admin/statut-ecole-doctorale-create-admin.component';
import {
    StatutEcoleDoctoraleListAdminComponent
} from './view/referentiel/statut-ecole-doctorale-admin/list-admin/statut-ecole-doctorale-list-admin.component';
import {
    StatutEcoleDoctoraleViewAdminComponent
} from './view/referentiel/statut-ecole-doctorale-admin/view-admin/statut-ecole-doctorale-view-admin.component';
import {StatutEcoleDoctoraleAdminComponent} from './view/referentiel/statut-ecole-doctorale-admin/statut-ecole-doctorale-admin.component';
import {
    StatutEcoleDoctoraleEditAdminComponent
} from './view/referentiel/statut-ecole-doctorale-admin/edit-admin/statut-ecole-doctorale-edit-admin.component';
import {StatusProjetCreateAdminComponent} from './view/referentiel/status-projet-admin/create-admin/status-projet-create-admin.component';
import {StatusProjetEditAdminComponent} from './view/referentiel/status-projet-admin/edit-admin/status-projet-edit-admin.component';
import {StatusProjetListAdminComponent} from './view/referentiel/status-projet-admin/list-admin/status-projet-list-admin.component';
import {StatusProjetAdminComponent} from './view/referentiel/status-projet-admin/status-projet-admin.component';
import {StatusProjetViewAdminComponent} from './view/referentiel/status-projet-admin/view-admin/status-projet-view-admin.component';
import {RoleProjetAdminComponent} from './view/referentiel/role-projet-admin/role-projet-admin.component';
import {RoleProjetEditAdminComponent} from './view/referentiel/role-projet-admin/edit-admin/role-projet-edit-admin.component';
import {RoleProjetListAdminComponent} from './view/referentiel/role-projet-admin/list-admin/role-projet-list-admin.component';
import {RoleProjetCreateAdminComponent} from './view/referentiel/role-projet-admin/create-admin/role-projet-create-admin.component';
import {RoleProjetViewAdminComponent} from './view/referentiel/role-projet-admin/view-admin/role-projet-view-admin.component';
import {SexeCreateAdminComponent} from './view/referentiel/sexe-admin/create-admin/sexe-create-admin.component';
import {SexeAdminComponent} from './view/referentiel/sexe-admin/sexe-admin.component';
import {SexeViewAdminComponent} from './view/referentiel/sexe-admin/view-admin/sexe-view-admin.component';
import {SexeEditAdminComponent} from './view/referentiel/sexe-admin/edit-admin/sexe-edit-admin.component';
import {SexeListAdminComponent} from './view/referentiel/sexe-admin/list-admin/sexe-list-admin.component';


import {CommanditaireListAdminComponent} from './view/referentiel/commanditaire-admin/list-admin/commanditaire-list-admin.component';
import {
    ModaliteInterventionListAdminComponent
} from './view/referentiel/modalite-intervention-admin/list-admin/modalite-intervention-list-admin.component';
import {
    NiveauFormationPostBacListAdminComponent
} from './view/referentiel/niveau-formation-post-bac-admin/list-admin/niveau-formation-post-bac-list-admin.component';
import {
    NiveauRespPedListAdminComponent
} from './view/referentiel/niveau-resp-ped-admin/list-admin/niveau-resp-ped-list-admin.component';
import {
    ObjetFormationGeneriqueListAdminComponent
} from './view/referentiel/objet-formation-generique-admin/list-admin/objet-formation-generique-list-admin.component';
import {PartenaireListAdminComponent} from './view/referentiel/partenaire-admin/list-admin/partenaire-list-admin.component';
import {
    PubliqueProfessionelListAdminComponent
} from './view/referentiel/publique-professionel-admin/list-admin/publique-professionel-list-admin.component';
import {
    RoleDeveloppementDeSavoirListAdminComponent
} from './view/referentiel/role-dev-de-savoir-admin/list-admin/role-dev-de-savoir-list-admin.component';
import {
    StatusContratEtConventionListAdminComponent
} from './view/referentiel/status-cont-conv-admin/list-admin/status-cont-conv-list-admin.component';
import {StatusCursusListAdminComponent} from './view/referentiel/status-cursus-admin/list-admin/status-cursus-list-admin.component';
import {TypeEtudeListAdminComponent} from './view/referentiel/type-etude-admin/list-admin/type-etude-list-admin.component';
import {
    ModaliteInterventionViewAdminComponent
} from './view/referentiel/modalite-intervention-admin/view-admin/modalite-intervention-view-admin.component';
import {
    ObjetFormationGeneriqueEditAdminComponent
} from './view/referentiel/objet-formation-generique-admin/edit-admin/objet-formation-generique-edit-admin.component';
import {CommanditaireViewAdminComponent} from './view/referentiel/commanditaire-admin/view-admin/commanditaire-view-admin.component';
import {
    NiveauFormationPostBacViewAdminComponent
} from './view/referentiel/niveau-formation-post-bac-admin/view-admin/niveau-formation-post-bac-view-admin.component';
import {
    StatusContratEtConventionCreateAdminComponent
} from './view/referentiel/status-cont-conv-admin/create-admin/status-cont-conv-create-admin.component';
import {
    ObjetFormationGeneriqueViewAdminComponent
} from './view/referentiel/objet-formation-generique-admin/view-admin/objet-formation-generique-view-admin.component';
import {
    ObjetFormationGeneriqueCreateAdminComponent
} from './view/referentiel/objet-formation-generique-admin/create-admin/objet-formation-generique-create-admin.component';
import {
    RoleDeveloppementDeSavoirCreateAdminComponent
} from './view/referentiel/role-dev-de-savoir-admin/create-admin/role-dev-de-savoir-create-admin.component';
import {TypeEtudeCreateAdminComponent} from './view/referentiel/type-etude-admin/create-admin/type-etude-create-admin.component';
import {
    PubliqueProfessionelViewAdminComponent
} from './view/referentiel/publique-professionel-admin/view-admin/publique-professionel-view-admin.component';
import {TypeEtudeViewAdminComponent} from './view/referentiel/type-etude-admin/view-admin/type-etude-view-admin.component';
import {
    RoleDeveloppementDeSavoirEditAdminComponent
} from './view/referentiel/role-dev-de-savoir-admin/edit-admin/role-dev-de-savoir-edit-admin.component';
import {
    PubliqueProfessionelCreateAdminComponent
} from './view/referentiel/publique-professionel-admin/create-admin/publique-professionel-create-admin.component';
import {
    StatusContratEtConventionViewAdminComponent
} from './view/referentiel/status-cont-conv-admin/view-admin/status-cont-conv-view-admin.component';
import {StatusCursusEditAdminComponent} from './view/referentiel/status-cursus-admin/edit-admin/status-cursus-edit-admin.component';
import {
    NiveauRespPedEditAdminComponent
} from './view/referentiel/niveau-resp-ped-admin/edit-admin/niveau-resp-ped-edit-admin.component';
import {PartenaireViewAdminComponent} from './view/referentiel/partenaire-admin/view-admin/partenaire-view-admin.component';
import {StatusCursusViewAdminComponent} from './view/referentiel/status-cursus-admin/view-admin/status-cursus-view-admin.component';
import {
    ModaliteInterventionCreateAdminComponent
} from './view/referentiel/modalite-intervention-admin/create-admin/modalite-intervention-create-admin.component';
import {CommanditaireEditAdminComponent} from './view/referentiel/commanditaire-admin/edit-admin/commanditaire-edit-admin.component';
import {TypeEtudeEditAdminComponent} from './view/referentiel/type-etude-admin/edit-admin/type-etude-edit-admin.component';
import {
    NiveauFormationPostBacEditAdminComponent
} from './view/referentiel/niveau-formation-post-bac-admin/edit-admin/niveau-formation-post-bac-edit-admin.component';
import {StatusCursusCreateAdminComponent} from './view/referentiel/status-cursus-admin/create-admin/status-cursus-create-admin.component';
import {PartenaireCreateAdminComponent} from './view/referentiel/partenaire-admin/create-admin/partenaire-create-admin.component';
import {PartenaireEditAdminComponent} from './view/referentiel/partenaire-admin/edit-admin/partenaire-edit-admin.component';
import {
    NiveauFormationPostBacCreateAdminComponent
} from './view/referentiel/niveau-formation-post-bac-admin/create-admin/niveau-formation-post-bac-create-admin.component';
import {
    NiveauRespPedCreateAdminComponent
} from './view/referentiel/niveau-resp-ped-admin/create-admin/niveau-resp-ped-create-admin.component';
import {CommanditaireCreateAdminComponent} from './view/referentiel/commanditaire-admin/create-admin/commanditaire-create-admin.component';
import {
    NiveauRespPedViewAdminComponent
} from './view/referentiel/niveau-resp-ped-admin/view-admin/niveau-resp-ped-view-admin.component';
import {
    RoleDeveloppementDeSavoirViewAdminComponent
} from './view/referentiel/role-dev-de-savoir-admin/view-admin/role-dev-de-savoir-view-admin.component';
import {
    ModaliteInterventionEditAdminComponent
} from './view/referentiel/modalite-intervention-admin/edit-admin/modalite-intervention-edit-admin.component';
import {
    StatusContratEtConventionEditAdminComponent
} from './view/referentiel/status-cont-conv-admin/edit-admin/status-cont-conv-edit-admin.component';
import {
    PubliqueProfessionelEditAdminComponent
} from './view/referentiel/publique-professionel-admin/edit-admin/publique-professionel-edit-admin.component';
import {
    NatureEnseignementCreateAdminComponent
} from './view/referentiel/nature-enseignement-admin/create-admin/nature-enseignement-create-admin.component';
import {
    NatureEnseignementListAdminComponent
} from './view/referentiel/nature-enseignement-admin/list-admin/nature-enseignement-list-admin.component';
import {
    NatureEnseignementViewAdminComponent
} from './view/referentiel/nature-enseignement-admin/view-admin/nature-enseignement-view-admin.component';
import {
    NatureEnseignementEditAdminComponent
} from './view/referentiel/nature-enseignement-admin/edit-admin/nature-enseignement-edit-admin.component';
import {
    AffectationStructurelleAdminComponent
} from './view/referentiel/affectation-structurelle-admin/affectation-structurelle-admin.component';
import {
    AffectationStructurelleCreateAdminComponent
} from './view/referentiel/affectation-structurelle-admin/create-admin/affectation-structurelle-create-admin.component';
import {
    AffectationStructurelleViewAdminComponent
} from './view/referentiel/affectation-structurelle-admin/view-admin/affectation-structurelle-view-admin.component';
import {
    AffectationStructurelleEditAdminComponent
} from './view/referentiel/affectation-structurelle-admin/edit-admin/affectation-structurelle-edit-admin.component';
import {
    AffectationStructurelleListAdminComponent
} from './view/referentiel/affectation-structurelle-admin/list-admin/affectation-structurelle-list-admin.component';
import {ZoneGeographiqueAdminComponent} from './view/referentiel/zone-geographique-admin/zone-geographique-admin.component';
import {
    ZoneGeographiqueCreateAdminComponent
} from './view/referentiel/zone-geographique-admin/create-admin/zone-geographique-create-admin.component';
import {
    ZoneGeographiqueListAdminComponent
} from './view/referentiel/zone-geographique-admin/list-admin/zone-geographique-list-admin.component';
import {
    ZoneGeographiqueViewAdminComponent
} from './view/referentiel/zone-geographique-admin/view-admin/zone-geographique-view-admin.component';
import {
    ZoneGeographiqueEditAdminComponent
} from './view/referentiel/zone-geographique-admin/edit-admin/zone-geographique-edit-admin.component';
import {
    EtablissementPartenaireCreateAdminComponent
} from './view/referentiel/etablissement-partenaire-admin/create-admin/etablissement-partenaire-create-admin.component';
import {
    EtablissementPartenaireEditAdminComponent
} from './view/referentiel/etablissement-partenaire-admin/edit-admin/etablissement-partenaire-edit-admin.component';
import {
    EtablissementPartenaireListAdminComponent
} from './view/referentiel/etablissement-partenaire-admin/list-admin/etablissement-partenaire-list-admin.component';
import {
    EtablissementPartenaireViewAdminComponent
} from './view/referentiel/etablissement-partenaire-admin/view-admin/etablissement-partenaire-view-admin.component';
import {
    ResponsabiliteEncadrementEtudiantCreateAdminComponent
} from './view/referentiel/resp-encad-etud-admin/create-admin/resp-encad-etud-create-admin.component';
import {
    ResponsabiliteEncadrementEtudiantListAdminComponent
} from './view/referentiel/resp-encad-etud-admin/list-admin/resp-encad-etud-list-admin.component';
import {
    ResponsabiliteEncadrementEtudiantViewAdminComponent
} from './view/referentiel/resp-encad-etud-admin/view-admin/resp-encad-etud-view-admin.component';
import {
    ResponsabiliteEncadrementEtudiantEditAdminComponent
} from './view/referentiel/resp-encad-etud-admin/edit-admin/resp-encad-etud-edit-admin.component';
import {
    ResponsabiliteEncadrementDoctorantViewAdminComponent
} from './view/referentiel/res-enca-doc-admin/view-admin/res-enca-doc-view-admin.component';
import {OrganismeCreateAdminComponent} from './view/referentiel/organisme-admin/create-admin/organisme-create-admin.component';
import {OrganismeListAdminComponent} from './view/referentiel/organisme-admin/list-admin/organisme-list-admin.component';
import {OrganismeViewAdminComponent} from './view/referentiel/organisme-admin/view-admin/organisme-view-admin.component';
import {OrganismeEditAdminComponent} from './view/referentiel/organisme-admin/edit-admin/organisme-edit-admin.component';
import {
    NatureActiviteGrandPubliqueCreateAdminComponent
} from './view/referentiel/nature-activite-grand-publique-admin/create-admin/nature-activite-grand-publique-create-admin.component';
import {
    NatureActiviteGrandPubliqueListAdminComponent
} from './view/referentiel/nature-activite-grand-publique-admin/list-admin/nature-activite-grand-publique-list-admin.component';
import {
    NatureActiviteGrandPubliqueViewAdminComponent
} from './view/referentiel/nature-activite-grand-publique-admin/view-admin/nature-activite-grand-publique-view-admin.component';
import {
    NatureActiviteGrandPubliqueEditAdminComponent
} from './view/referentiel/nature-activite-grand-publique-admin/edit-admin/nature-activite-grand-publique-edit-admin.component';
import {
    RoleEvaluationRechercheUniversitaireCreateAdminComponent
} from './view/referentiel/role-eval-rech-uni-admin/create-admin/role-eval-rech-uni-create-admin.component';
import {
    RoleEvaluationRechercheUniversitaireListAdminComponent
} from './view/referentiel/role-eval-rech-uni-admin/list-admin/role-eval-rech-uni-list-admin.component';
import {
    RoleEvaluationRechercheUniversitaireViewAdminComponent
} from './view/referentiel/role-eval-rech-uni-admin/view-admin/role-eval-rech-uni-view-admin.component';
import {
    RoleEvaluationRechercheUniversitaireEditAdminComponent
} from './view/referentiel/role-eval-rech-uni-admin/edit-admin/role-eval-rech-uni-edit-admin.component';
import {
    EvenementColloqueScienntifiqueListAdminComponent
} from './view/formulaire/evm-colloque-sci-admin/list-admin/evm-colloque-sci-list-admin.component';
import {
    InstrumentsEtDispositifsIrdEditAdminComponent
} from './view/formulaire/instr-disposi-ird-admin/edit-admin/instr-disposi-ird-edit-admin.component';
import {VieInstitutionnelleDetailAdminComponent} from './view/formulaire/vie-inst-detail-admin/vie-inst-detail-admin.component';
import {
    VieInstitutionnelleDetailEditAdminComponent
} from './view/formulaire/vie-inst-detail-admin/edit-admin/vie-inst-detail-edit-admin.component';
import {
    ResponsabilitePedagogiqueMasterEditAdminComponent
} from './view/formulaire/resp-ped-master-admin/edit-admin/resp-ped-master-edit-admin.component';
import {
    ConseilEtComiteScientifiqueEditAdminComponent
} from './view/formulaire/conseil-comite-sci-admin/edit-admin/conseil-comite-sci-edit-admin.component';
import {
    VieInstitutionnelleDetailViewAdminComponent
} from './view/formulaire/vie-inst-detail-admin/view-admin/vie-inst-detail-view-admin.component';
import {
    EvenementColloqueScienntifiqueEditAdminComponent
} from './view/formulaire/evm-colloque-sci-admin/edit-admin/evm-colloque-sci-edit-admin.component';
import {
    InstrumentsEtDispositifsIrdListAdminComponent
} from './view/formulaire/instr-disposi-ird-admin/list-admin/instr-disposi-ird-list-admin.component';
import {
    EvaluationRechercheUniversitaireCreateAdminComponent
} from './view/formulaire/eval-recherche-univ-admin/create-admin/eval-recherche-univ-create-admin.component';
import {
    ConseilEtComiteScientifiqueViewAdminComponent
} from './view/formulaire/conseil-comite-sci-admin/view-admin/conseil-comite-sci-view-admin.component';
import {ResponsabilitePedagogiqueMasterAdminComponent} from './view/formulaire/resp-ped-master-admin/resp-ped-master-admin.component';
import {
    ResponsabilitePedagogiqueMasterCreateAdminComponent
} from './view/formulaire/resp-ped-master-admin/create-admin/resp-ped-master-create-admin.component';
import {
    EvaluationRechercheUniversitaireEditAdminComponent
} from './view/formulaire/eval-recherche-univ-admin/edit-admin/eval-recherche-univ-edit-admin.component';
import {
    ConseilEtComiteScientifiqueCreateAdminComponent
} from './view/formulaire/conseil-comite-sci-admin/create-admin/conseil-comite-sci-create-admin.component';
import {
    ConseilEtComiteScientifiqueListAdminComponent
} from './view/formulaire/conseil-comite-sci-admin/list-admin/conseil-comite-sci-list-admin.component';
import {
    EvenementColloqueScienntifiqueViewAdminComponent
} from './view/formulaire/evm-colloque-sci-admin/view-admin/evm-colloque-sci-view-admin.component';
import {
    EvenementColloqueScienntifiqueCreateAdminComponent
} from './view/formulaire/evm-colloque-sci-admin/create-admin/evm-colloque-sci-create-admin.component';
import {
    ResponsabilitePedagogiqueMasterListAdminComponent
} from './view/formulaire/resp-ped-master-admin/list-admin/resp-ped-master-list-admin.component';
import {
    VieInstitutionnelleDetailCreateAdminComponent
} from './view/formulaire/vie-inst-detail-admin/create-admin/vie-inst-detail-create-admin.component';
import {
    VieInstitutionnelleDetailListAdminComponent
} from './view/formulaire/vie-inst-detail-admin/list-admin/vie-inst-detail-list-admin.component';
import {
    InstrumentsEtDispositifsIrdViewAdminComponent
} from './view/formulaire/instr-disposi-ird-admin/view-admin/instr-disposi-ird-view-admin.component';
import {
    EvaluationRechercheUniversitaireViewAdminComponent
} from './view/formulaire/eval-recherche-univ-admin/view-admin/eval-recherche-univ-view-admin.component';
import {
    EvaluationRechercheUniversitaireListAdminComponent
} from './view/formulaire/eval-recherche-univ-admin/list-admin/eval-recherche-univ-list-admin.component';
import {
    InstrumentsEtDispositifsIrdCreateAdminComponent
} from './view/formulaire/instr-disposi-ird-admin/create-admin/instr-disposi-ird-create-admin.component';
import {ConseilEtComiteScientifiqueAdminComponent} from './view/formulaire/conseil-comite-sci-admin/conseil-comite-sci-admin.component';
import {InstrumentsEtDispositifsIrdAdminComponent} from './view/formulaire/instr-disposi-ird-admin/instr-disposi-ird-admin.component';
import {EvalRechercheUnivAdminComponent} from './view/formulaire/eval-recherche-univ-admin/eval-recherche-univ-admin.component';
import {EvenementColloqueScienntifiqueAdminComponent} from './view/formulaire/evm-colloque-sci-admin/evm-colloque-sci-admin.component';
import {
    ResponsabilitePedagogiqueMasterViewAdminComponent
} from './view/formulaire/resp-ped-master-admin/view-admin/resp-ped-master-view-admin.component';
import { CommissionScientifiqueCreateAdminComponent } from './view/formulaire/commis-scien-admin/create-admin/commis-scien-create-admin.component';
import { CommisScienListAdminComponent } from './view/formulaire/commis-scien-admin/list-admin/commis-scien-list-admin.component';
import { CommissionScientifiqueViewAdminComponent } from './view/formulaire/commis-scien-admin/view-admin/commis-scien-view-admin.component';
import {CommissionScientifiqueAdminComponent} from './view/formulaire/commis-scien-admin/commis-scien-admin.component';
import {CommisScienEditAdminComponent} from './view/formulaire/commis-scien-admin/edit-admin/commis-scien-edit-admin.component';
import { ResponsabiliteEncadrementDoctorantCreateAdminComponent } from './view/referentiel/res-enca-doc-admin/create-admin/res-enca-doc-create-admin.component';
import { ResponsabiliteEncadrementDoctorantListAdminComponent } from './view/referentiel/res-enca-doc-admin/list-admin/res-enca-doc-list-admin.component';
import { ResponsabiliteEncadrementDoctorantEditAdminComponent } from './view/referentiel/res-enca-doc-admin/edit-admin/res-enca-doc-edit-admin.component';
import { KeyWordDisciplineScientifiqueErcCreateAdminComponent } from './view/referentiel/kw-d-sc-erc-admin/create-admin/kw-d-sc-erc-create-admin.component';
import {
    KeyWordDisciplineScientifiqueErcListAdminComponent
} from './view/referentiel/kw-d-sc-erc-admin/list-admin/kw-d-sc-erc-list-admin.component';
import {
    KeyWordDisciplineScientifiqueErcViewAdminComponent
} from './view/referentiel/kw-d-sc-erc-admin/view-admin/kw-d-sc-erc-view-admin.component';
import {
    KeyWordDisciplineScientifiqueErcEditAdminComponent
} from './view/referentiel/kw-d-sc-erc-admin/edit-admin/kw-d-sc-erc-edit-admin.component';
import {KeyWordDisciplineScientifiqueErcAdminComponent} from './view/referentiel/kw-d-sc-erc-admin/kw-d-sc-erc-admin.component';
import {
    DisciplineScientifiqueErcAssociationCreateAdminComponent
} from './view/referentiel/ds-erc-asso-admin/create-admin/ds-erc-asso-create-admin.component';
import {
    DisciplineScientifiqueErcAssociationListAdminComponent
} from './view/referentiel/ds-erc-asso-admin/list-admin/ds-erc-asso-list-admin.component';
import {
    DisciplineScientifiqueErcAssociationViewAdminComponent
} from './view/referentiel/ds-erc-asso-admin/view-admin/ds-erc-asso-view-admin.component';
import {
    DisciplineScientifiqueErcAssociationEditAdminComponent
} from './view/referentiel/ds-erc-asso-admin/edit-admin/ds-erc-asso-edit-admin.component';
import {DisciplineScientifiqueErcAssociationAdminComponent} from './view/referentiel/ds-erc-asso-admin/ds-erc-asso-admin.component';
import {SplitterModule} from 'primeng/splitter';
import {PiloteDeDonneesListAdminComponent} from './view/formulaire/pilote-de-donnees-list-admin/pilote-de-donnees-list-admin.component';
import { TypeUtilisateurCreateAdminComponent } from './view/referentiel/type-utilisateur-admin/create-admin/type-utilisateur-create-admin.component';
import {
    TypeUtilisateurListAdminComponent
} from './view/referentiel/type-utilisateur-admin/list-admin/type-utilisateur-list-admin.component';
import {
    TypeUtilisateurViewAdminComponent
} from './view/referentiel/type-utilisateur-admin/view-admin/type-utilisateur-view-admin.component';
import {
    TypeUtilisateurEditAdminComponent
} from './view/referentiel/type-utilisateur-admin/edit-admin/type-utilisateur-edit-admin.component';
import {TypeUtilisateurAdminComponent} from './view/referentiel/type-utilisateur-admin/type-utilisateur-admin.component';
import {UserAppComponent} from './view/user-app/user-app.component';
import {UserAppAddComponent} from './view/user-app/user-app-add/user-app-add.component';
import {UserAppEditComponent} from './view/user-app/user-app-edit/user-app-edit.component';
import {UserAppListComponent} from './view/user-app/user-app-list/user-app-list.component';
import {UserAppViewComponent} from './view/user-app/user-app-view/user-app-view.component';

@NgModule({
    declarations: [
        PiloteDeDonneesListAdminComponent,

        UserAppComponent,
        UserAppAddComponent,
        UserAppEditComponent,
        UserAppListComponent,
        UserAppViewComponent,


        CampagneSendEmailRappelComponent,
        EmailRappelDetailsComponent,
        EmailRappelComponent,
        EmailRelanceComponent,
        LoginAdminComponent,
        RegisterAdminComponent,
        AffectationStructurelleAdminComponent,
        AffectationStructurelleCreateAdminComponent,
        AffectationStructurelleListAdminComponent,
        AffectationStructurelleEditAdminComponent,
        AffectationStructurelleViewAdminComponent,
        ZoneGeographiqueAdminComponent,
        ZoneGeographiqueCreateAdminComponent,
        ZoneGeographiqueListAdminComponent,
        ZoneGeographiqueEditAdminComponent,
        ZoneGeographiqueViewAdminComponent,

        OutilFormationContinueCreateAdminComponent,
        OutilFormationContinueListAdminComponent,
        OutilFormationContinueViewAdminComponent,
        OutilFormationContinueEditAdminComponent,
        OutilFormationContinueAdminComponent,
        FinancementDoctorantCreateAdminComponent,
        FinancementDoctorantListAdminComponent,
        FinancementDoctorantViewAdminComponent,
        FinancementDoctorantEditAdminComponent,
        FinancementDoctorantAdminComponent,
        GradeCreateAdminComponent,
        GradeListAdminComponent,
        GradeViewAdminComponent,
        GradeEditAdminComponent,
        GradeAdminComponent,
        EncadrementDoctorantCreateAdminComponent,
        EncadrementDoctorantListAdminComponent,
        EncadrementDoctorantViewAdminComponent,
        EncadrementDoctorantEditAdminComponent,
        EncadrementDoctorantAdminComponent,
        PublicCibleCreateAdminComponent,
        PublicCibleListAdminComponent,
        PublicCibleViewAdminComponent,
        PublicCibleEditAdminComponent,
        PublicCibleAdminComponent,
        FormationContinueCreateAdminComponent,
        FormationContinueListAdminComponent,
        FormationContinueViewAdminComponent,
        FormationContinueEditAdminComponent,
        FormationContinueAdminComponent,
        PaysCreateAdminComponent,
        PaysListAdminComponent,
        PaysViewAdminComponent,
        PaysEditAdminComponent,
        PaysAdminComponent,
        TemplateRelanceCreateAdminComponent,
        TemplateRelanceListAdminComponent,
        TemplateRelanceViewAdminComponent,
        TemplateRelanceEditAdminComponent,
        TemplateRelanceAdminComponent,
        ConseilEtComiteScientifiqueCreateAdminComponent,
        ConseilEtComiteScientifiqueListAdminComponent,
        ConseilEtComiteScientifiqueViewAdminComponent,
        ConseilEtComiteScientifiqueEditAdminComponent,
        ConseilEtComiteScientifiqueAdminComponent,
        EtablissementPartenaireCreateAdminComponent,
        EtablissementPartenaireListAdminComponent,
        EtablissementPartenaireViewAdminComponent,
        EtablissementPartenaireEditAdminComponent,
        EvenementColloqueScienntifiqueCreateAdminComponent,
        EvenementColloqueScienntifiqueListAdminComponent,
        EvenementColloqueScienntifiqueViewAdminComponent,
        EvenementColloqueScienntifiqueEditAdminComponent,
        EvenementColloqueScienntifiqueAdminComponent,
        ResponsabiliteEncadrementEtudiantCreateAdminComponent,
        ResponsabiliteEncadrementEtudiantListAdminComponent,
        ResponsabiliteEncadrementEtudiantViewAdminComponent,
        ResponsabiliteEncadrementEtudiantEditAdminComponent,
        MasterInternationalCreateAdminComponent,
        MasterInternationalListAdminComponent,
        MasterInternationalViewAdminComponent,
        MasterInternationalEditAdminComponent,
        MasterInternationalAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
        TypeExpertCreateAdminComponent,
        TypeExpertListAdminComponent,
        TypeExpertViewAdminComponent,
        TypeExpertEditAdminComponent,
        TypeExpertAdminComponent,
        IdentifiantAuteurExpertCreateAdminComponent,
        IdentifiantAuteurExpertListAdminComponent,
        IdentifiantAuteurExpertViewAdminComponent,
        IdentifiantAuteurExpertEditAdminComponent,
        IdentifiantAuteurExpertAdminComponent,
        CampagneChercheurCreateAdminComponent,
        CampagneChercheurListAdminComponent,
        CampagneChercheurViewAdminComponent,
        CampagneChercheurEditAdminComponent,
        CampagneChercheurAdminComponent,
        VieInstitutionnelleDetailAdminComponent,
        VieInstitutionnelleDetailCreateAdminComponent,
        VieInstitutionnelleDetailEditAdminComponent,
        VieInstitutionnelleDetailListAdminComponent,
        VieInstitutionnelleDetailViewAdminComponent,
        InstrumentIrdCreateAdminComponent,
        InstrumentIrdListAdminComponent,
        InstrumentIrdViewAdminComponent,
        InstrumentIrdEditAdminComponent,
        InstrumentIrdAdminComponent,
        TypeInstrumentIrdCreateAdminComponent,
        TypeInstrumentIrdListAdminComponent,
        TypeInstrumentIrdViewAdminComponent,
        TypeInstrumentIrdEditAdminComponent,
        TypeInstrumentIrdAdminComponent,
        StructureIrdCreateAdminComponent,
        StructureIrdListAdminComponent,
        StructureIrdViewAdminComponent,
        StructureIrdEditAdminComponent,
        StructureIrdAdminComponent,
        VieInstitutionnelleCreateAdminComponent,
        VieInstitutionnelleListAdminComponent,
        VieInstitutionnelleViewAdminComponent,
        VieInstitutionnelleEditAdminComponent,
        VieInstitutionnelleAdminComponent,
        CommunauteSavoirChercheurCreateAdminComponent,
        CommunauteSavoirChercheurListAdminComponent,
        CommunauteSavoirChercheurViewAdminComponent,
        CommunauteSavoirChercheurEditAdminComponent,
        CommunauteSavoirChercheurAdminComponent,
        EcoleDoctoraleCreateAdminComponent,
        EcoleDoctoraleListAdminComponent,
        EcoleDoctoraleViewAdminComponent,
        EcoleDoctoraleEditAdminComponent,
        EcoleDoctoraleAdminComponent,
        EtablissementCreateAdminComponent,
        EtablissementListAdminComponent,
        EtablissementViewAdminComponent,
        EtablissementEditAdminComponent,
        EtablissementAdminComponent,
        ModeDiffusionCreateAdminComponent,
        ModeDiffusionListAdminComponent,
        ModeDiffusionViewAdminComponent,
        ModeDiffusionEditAdminComponent,
        ModeDiffusionAdminComponent,
        EncadrementEtudiantCreateAdminComponent,
        EncadrementEtudiantListAdminComponent,
        EncadrementEtudiantViewAdminComponent,
        EncadrementEtudiantEditAdminComponent,
        EncadrementEtudiantAdminComponent,
        TemplateClotureCreateAdminComponent,
        TemplateClotureListAdminComponent,
        TemplateClotureViewAdminComponent,
        TemplateClotureEditAdminComponent,
        TemplateClotureAdminComponent,
        InstitutionCreateAdminComponent,
        InstitutionListAdminComponent,
        InstitutionViewAdminComponent,
        InstitutionEditAdminComponent,
        InstitutionAdminComponent,
        EnjeuxIrdCreateAdminComponent,
        EnjeuxIrdListAdminComponent,
        EnjeuxIrdViewAdminComponent,
        EnjeuxIrdEditAdminComponent,
        EnjeuxIrdAdminComponent,
        EtatReclamationCreateAdminComponent,
        EtatReclamationListAdminComponent,
        EtatReclamationViewAdminComponent,
        EtatReclamationEditAdminComponent,
        EtatReclamationAdminComponent,
        ResponsabilitePedagogiqueMasterCreateAdminComponent,
        ResponsabilitePedagogiqueMasterListAdminComponent,
        ResponsabilitePedagogiqueMasterViewAdminComponent,
        ResponsabilitePedagogiqueMasterEditAdminComponent,
        ResponsabilitePedagogiqueMasterAdminComponent,
        CultureSciRecontreGpjpAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicListAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicViewAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicEditAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicAdminComponent,
        EtudiantCreateAdminComponent,
        EtudiantListAdminComponent,
        EtudiantViewAdminComponent,
        EtudiantEditAdminComponent,
        EtudiantAdminComponent,
        EtatEtapeCampagneCreateAdminComponent,
        EtatEtapeCampagneListAdminComponent,
        EtatEtapeCampagneViewAdminComponent,
        EtatEtapeCampagneEditAdminComponent,
        EtatEtapeCampagneAdminComponent,
        EtatCampagneCreateAdminComponent,
        EtatCampagneListAdminComponent,
        EtatCampagneViewAdminComponent,
        EtatCampagneEditAdminComponent,
        EtatCampagneAdminComponent,
        IdentifiantRechercheCreateAdminComponent,
        IdentifiantRechercheListAdminComponent,
        IdentifiantRechercheViewAdminComponent,
        IdentifiantRechercheEditAdminComponent,
        IdentifiantRechercheAdminComponent,
        TypeInstrumentsEtDispositifsIrdCreateAdminComponent,
        TypeInstrumentsEtDispositifsIrdListAdminComponent,
        TypeInstrumentsEtDispositifsIrdViewAdminComponent,
        TypeInstrumentsEtDispositifsIrdEditAdminComponent,
        TypeInstrumentsEtDispositifsIrdAdminComponent,
        ResponsabiliteEncadrementDoctorantCreateAdminComponent,
        ResponsabiliteEncadrementDoctorantListAdminComponent,
        ResponsabiliteEncadrementDoctorantViewAdminComponent,
        ResponsabiliteEncadrementDoctorantEditAdminComponent,
        PubliquePrincipalCreateAdminComponent,
        PubliquePrincipalListAdminComponent,
        PubliquePrincipalViewAdminComponent,
        PubliquePrincipalEditAdminComponent,
        PubliquePrincipalAdminComponent,
        DoctorantCreateAdminComponent,
        DoctorantListAdminComponent,
        DoctorantViewAdminComponent,
        DoctorantEditAdminComponent,
        DoctorantAdminComponent,
        InstrumentsEtDispositifsIrdCreateAdminComponent,
        InstrumentsEtDispositifsIrdListAdminComponent,
        InstrumentsEtDispositifsIrdViewAdminComponent,
        InstrumentsEtDispositifsIrdEditAdminComponent,
        InstrumentsEtDispositifsIrdAdminComponent,
        ObjetGlobalCreateAdminComponent,
        ObjetGlobalListAdminComponent,
        ObjetGlobalViewAdminComponent,
        ObjetGlobalEditAdminComponent,
        ObjetGlobalAdminComponent,
        EvaluationRechercheUniversitaireCreateAdminComponent,
        EvaluationRechercheUniversitaireListAdminComponent,
        EvaluationRechercheUniversitaireViewAdminComponent,
        EvaluationRechercheUniversitaireEditAdminComponent,
        EvalRechercheUnivAdminComponent,
        ModaliteFormationContinueCreateAdminComponent,
        ModaliteFormationContinueListAdminComponent,
        ModaliteFormationContinueViewAdminComponent,
        ModaliteFormationContinueEditAdminComponent,
        ModaliteFormationContinueAdminComponent,
        FormatRencontreCreateAdminComponent,
        FormatRencontreListAdminComponent,
        FormatRencontreViewAdminComponent,
        FormatRencontreEditAdminComponent,
        FormatRencontreAdminComponent,
        VilleCreateAdminComponent,
        VilleListAdminComponent,
        VilleViewAdminComponent,
        VilleEditAdminComponent,
        VilleAdminComponent,
        StatusProjetCreateAdminComponent,
        StatusProjetListAdminComponent,
        StatusProjetViewAdminComponent,
        StatusProjetEditAdminComponent,
        StatusProjetAdminComponent,
        ContinentCreateAdminComponent,
        ContinentListAdminComponent,
        ContinentViewAdminComponent,
        ContinentEditAdminComponent,
        ContinentAdminComponent,
        StatutEcoleDoctoraleCreateAdminComponent,
        StatutEcoleDoctoraleListAdminComponent,
        StatutEcoleDoctoraleViewAdminComponent,
        StatutEcoleDoctoraleEditAdminComponent,
        StatutEcoleDoctoraleAdminComponent,
        FournisseurAppelProjetRechercheCreateAdminComponent,
        FournisseurAppelProjetRechercheListAdminComponent,
        FournisseurAppelProjetRechercheViewAdminComponent,
        FournisseurAppelProjetRechercheEditAdminComponent,
        FournisseurAppelProjetRechercheAdminComponent,
        ModaliteCreateAdminComponent,
        ModaliteListAdminComponent,
        ModaliteViewAdminComponent,
        ModaliteEditAdminComponent,
        ModaliteAdminComponent,
        CaracterisationCreateAdminComponent,
        CaracterisationListAdminComponent,
        CaracterisationViewAdminComponent,
        CaracterisationEditAdminComponent,
        CaracterisationAdminComponent,
        TypeReclamationCreateAdminComponent,
        TypeReclamationListAdminComponent,
        TypeReclamationViewAdminComponent,
        TypeReclamationEditAdminComponent,
        TypeReclamationAdminComponent,
        CommunauteSavoirCreateAdminComponent,
        CommunauteSavoirListAdminComponent,
        CommunauteSavoirViewAdminComponent,
        CommunauteSavoirEditAdminComponent,
        CommunauteSavoirAdminComponent,
        TypeEnseignementDispenseCreateAdminComponent,
        TypeEnseignementDispenseListAdminComponent,
        TypeEnseignementDispenseViewAdminComponent,
        TypeEnseignementDispenseEditAdminComponent,
        TypeEnseignementDispenseAdminComponent,
        EtablissementProjetCreateAdminComponent,
        EtablissementProjetListAdminComponent,
        EtablissementProjetViewAdminComponent,
        EtablissementProjetEditAdminComponent,
        EtablissementProjetAdminComponent,
        EnseignementCreateAdminComponent,
        EnseignementListAdminComponent,
        EnseignementViewAdminComponent,
        EnseignementEditAdminComponent,
        EnseignementAdminComponent,
        BourseCreateAdminComponent,
        BourseListAdminComponent,
        BourseViewAdminComponent,
        BourseEditAdminComponent,
        BourseAdminComponent,
        EntiteAdministrativeCreateAdminComponent,
        EntiteAdministrativeListAdminComponent,
        EntiteAdministrativeViewAdminComponent,
        EntiteAdministrativeEditAdminComponent,
        EntiteAdministrativeAdminComponent,
        GestionEquipeCreateAdminComponent,
        GestionEquipeListAdminComponent,
        GestionEquipeViewAdminComponent,
        GestionEquipeEditAdminComponent,
        GestionEquipeAdminComponent,
        DistinctionCreateAdminComponent,
        DistinctionListAdminComponent,
        DistinctionViewAdminComponent,
        DistinctionEditAdminComponent,
        DistinctionAdminComponent,
        NiveauFormationCreateAdminComponent,
        NiveauFormationListAdminComponent,
        NiveauFormationViewAdminComponent,
        NiveauFormationEditAdminComponent,
        NiveauFormationAdminComponent,
        CultureScientifiqueOutilPedagogiqueCreateAdminComponent,
        CultureSciOutilPedaListAdmin,
        CultureScientifiqueOutilPedagogiqueViewAdminComponent,
        CultureScientifiqueOutilPedagogiqueEditAdminComponent,
        CultureSciOutilPedaAdmin,
        CategorieFaqCreateAdminComponent,
        CategorieFaqListAdminComponent,
        CategorieFaqViewAdminComponent,
        CategorieFaqEditAdminComponent,
        CategorieFaqAdminComponent,
        TemplateOuvertureCreateAdminComponent,
        TemplateOuvertureListAdminComponent,
        TemplateOuvertureViewAdminComponent,
        TemplateOuvertureEditAdminComponent,
        TemplateOuvertureAdminComponent,
        CommissionScientifiqueCreateAdminComponent,
        CommisScienListAdminComponent,
        CommissionScientifiqueViewAdminComponent,
        CommisScienEditAdminComponent,
        CommissionScientifiqueAdminComponent,
        StatutMasterCreateAdminComponent,
        StatutMasterListAdminComponent,
        StatutMasterViewAdminComponent,
        StatutMasterEditAdminComponent,
        StatutMasterAdminComponent,
        RoleEvaluationRechercheUniversitaireCreateAdminComponent,
        RoleEvaluationRechercheUniversitaireListAdminComponent,
        RoleEvaluationRechercheUniversitaireViewAdminComponent,
        RoleEvaluationRechercheUniversitaireEditAdminComponent,
        ReclamationCreateAdminComponent,
        ReclamationListAdminComponent,
        ReclamationViewAdminComponent,
        ReclamationEditAdminComponent,
        ReclamationAdminComponent,
        OrganismeCreateAdminComponent,
        OrganismeListAdminComponent,
        OrganismeViewAdminComponent,
        OrganismeEditAdminComponent,
        RoleProjetCreateAdminComponent,
        RoleProjetListAdminComponent,
        RoleProjetViewAdminComponent,
        RoleProjetEditAdminComponent,
        RoleProjetAdminComponent,
        TypeExpertiseCreateAdminComponent,
        TypeExpertiseListAdminComponent,
        TypeExpertiseViewAdminComponent,
        TypeExpertiseEditAdminComponent,
        TypeExpertiseAdminComponent,
        NationaliteCreateAdminComponent,
        NationaliteListAdminComponent,
        NationaliteViewAdminComponent,
        NationaliteEditAdminComponent,
        NationaliteAdminComponent,
        DepartementScientifiqueCreateAdminComponent,
        DepartementScientifiqueListAdminComponent,
        DepartementScientifiqueViewAdminComponent,
        DepartementScientifiqueEditAdminComponent,
        DepartementScientifiqueAdminComponent,
        NiveauEtudeCreateAdminComponent,
        NiveauEtudeListAdminComponent,
        NiveauEtudeViewAdminComponent,
        NiveauEtudeEditAdminComponent,
        NiveauEtudeAdminComponent,
        TypeInstanceCreateAdminComponent,
        TypeInstanceListAdminComponent,
        TypeInstanceViewAdminComponent,
        TypeInstanceEditAdminComponent,
        TypeInstanceAdminComponent,
        NatureEtudeCreateAdminComponent,
        NatureEtudeListAdminComponent,
        NatureEtudeViewAdminComponent,
        NatureEtudeEditAdminComponent,
        NatureEtudeAdminComponent,
        DisciplineScientifiqueCreateAdminComponent,
        DisciplineScientifiqueListAdminComponent,
        DisciplineScientifiqueViewAdminComponent,
        DisciplineScientifiqueEditAdminComponent,
        DisciplineScientifiqueAdminComponent,
        ContexteCreateAdminComponent,
        ContexteListAdminComponent,
        ContexteViewAdminComponent,
        ContexteEditAdminComponent,
        ContexteAdminComponent,
        EvaluationEncadrementCreateAdminComponent,
        EvaluationEncadrementListAdminComponent,
        EvaluationEncadrementViewAdminComponent,
        EvaluationEncadrementEditAdminComponent,
        EvaluationEncadrementAdminComponent,
        MasterCreateAdminComponent,
        MasterListAdminComponent,
        MasterViewAdminComponent,
        MasterEditAdminComponent,
        MasterAdminComponent,
        TypeSavoirCreateAdminComponent,
        TypeSavoirListAdminComponent,
        TypeSavoirViewAdminComponent,
        TypeSavoirEditAdminComponent,
        TypeSavoirAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleCreateAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleListAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleViewAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleEditAdminComponent,
        RespPedEcoleDoctoraleAdminComponent,
        DomaineScientifiqueCreateAdminComponent,
        DomaineScientifiqueListAdminComponent,
        DomaineScientifiqueViewAdminComponent,
        DomaineScientifiqueEditAdminComponent,
        DomaineScientifiqueAdminComponent,
        TypeEntiteAdministrativeCreateAdminComponent,
        TypeEntiteAdministrativeListAdminComponent,
        TypeEntiteAdministrativeViewAdminComponent,
        TypeEntiteAdministrativeEditAdminComponent,
        TypeEntiteAdministrativeAdminComponent,
        CorpsCreateAdminComponent,
        CorpsListAdminComponent,
        CorpsViewAdminComponent,
        CorpsEditAdminComponent,
        CorpsAdminComponent,
        SexeCreateAdminComponent,
        SexeListAdminComponent,
        SexeViewAdminComponent,
        SexeEditAdminComponent,
        SexeAdminComponent,
        ModaliteEtudeCreateAdminComponent,
        ModaliteEtudeListAdminComponent,
        ModaliteEtudeViewAdminComponent,
        ModaliteEtudeEditAdminComponent,
        ModaliteEtudeAdminComponent,
        TemplateRappelCreateAdminComponent,
        TemplateRappelListAdminComponent,
        TemplateRappelViewAdminComponent,
        TemplateRappelEditAdminComponent,
        TemplateRappelAdminComponent,
        TypeOutilCreateAdminComponent,
        TypeOutilListAdminComponent,
        TypeOutilViewAdminComponent,
        TypeOutilEditAdminComponent,
        TypeOutilAdminComponent,
        FaqCreateAdminComponent,
        FaqListAdminComponent,
        FaqViewAdminComponent,
        FaqEditAdminComponent,
        FaqAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        ExpertiseScientifiqueCreateAdminComponent,
        ExpertiseScientifiqueListAdminComponent,
        ExpertiseScientifiqueViewAdminComponent,
        ExpertiseScientifiqueEditAdminComponent,
        ExpertiseScientifiqueAdminComponent,
        CampagneCreateAdminComponent,
        CampagneListAdminComponent,
        CampagneViewAdminComponent,
        CampagneEditAdminComponent,
        CampagneAdminComponent,
        EtatCampagneChercheurCreateAdminComponent,
        EtatCampagneChercheurListAdminComponent,
        EtatCampagneChercheurViewAdminComponent,
        EtatCampagneChercheurEditAdminComponent,
        EtatCampagneChercheurAdminComponent,
        FaqVisualisationAdminComponent,
        CampagneSendEmailRelanceComponent,
        EmailRelanceComponent,
        EmailRappelComponent,
        EmailRelanceDetailsComponent,
        EmailRappelDetailsComponent,
        CampagneSendEmailRappelComponent,
        SwitchChercheurAdminComponent,
        TypePubliqueCreateAdminComponent,
        TypePubliqueListAdminComponent,
        TypePubliqueViewAdminComponent,
        TypePubliqueEditAdminComponent,
        TypePubliqueAdminComponent,
        LangueCreateAdminComponent,
        LangueListAdminComponent,
        LangueViewAdminComponent,
        LangueEditAdminComponent,
        LangueAdminComponent,
        NatureActiviteGrandPubliqueCreateAdminComponent,
        NatureActiviteGrandPubliqueListAdminComponent,
        NatureActiviteGrandPubliqueViewAdminComponent,
        NatureActiviteGrandPubliqueEditAdminComponent,
        TypeUtilisateurCreateAdminComponent,
        TypeUtilisateurListAdminComponent,
        TypeUtilisateurViewAdminComponent,
        TypeUtilisateurEditAdminComponent,
        TypeUtilisateurAdminComponent,
        TypeParticipationCreateAdminComponent,
        TypeParticipationListAdminComponent,
        TypeParticipationViewAdminComponent,
        TypeParticipationEditAdminComponent,
        TypeParticipationAdminComponent,
        SemanticRelationshipCreateAdminComponent,
        SemanticRelationshipListAdminComponent,
        SemanticRelationshipViewAdminComponent,
        SemanticRelationshipEditAdminComponent,
        SemanticRelationshipAdminComponent,
        KeyWordCreateAdminComponent,
        KeyWordListAdminComponent,
        KeyWordViewAdminComponent,
        KeyWordEditAdminComponent,
        KeyWordAdminComponent,
        KeyWordDisciplineScientifiqueErcCreateAdminComponent,
        KeyWordDisciplineScientifiqueErcListAdminComponent,
        KeyWordDisciplineScientifiqueErcViewAdminComponent,
        KeyWordDisciplineScientifiqueErcEditAdminComponent,
        KeyWordDisciplineScientifiqueErcAdminComponent,
        DisciplineScientifiqueErcAssociationCreateAdminComponent,
        DisciplineScientifiqueErcAssociationListAdminComponent,
        DisciplineScientifiqueErcAssociationViewAdminComponent,
        DisciplineScientifiqueErcAssociationEditAdminComponent,
        DisciplineScientifiqueErcAssociationAdminComponent,
        DisciplineScientifiqueErcCreateAdminComponent,
        DisciplineScientifiqueErcListAdminComponent,
        DisciplineScientifiqueErcViewAdminComponent,
        DisciplineScientifiqueErcEditAdminComponent,
        DisciplineScientifiqueErcAdminComponent,


        CommanditaireCreateAdminComponent,
        CommanditaireListAdminComponent,
        CommanditaireViewAdminComponent,
        CommanditaireEditAdminComponent,

        EtablissementPartenaireCreateAdminComponent,
        EtablissementPartenaireListAdminComponent,
        EtablissementPartenaireViewAdminComponent,
        EtablissementPartenaireEditAdminComponent,

        ModaliteInterventionCreateAdminComponent,
        ModaliteInterventionListAdminComponent,
        ModaliteInterventionViewAdminComponent,
        ModaliteInterventionEditAdminComponent,

        NatureActiviteGrandPubliqueCreateAdminComponent,
        NatureActiviteGrandPubliqueListAdminComponent,
        NatureActiviteGrandPubliqueViewAdminComponent,
        NatureActiviteGrandPubliqueEditAdminComponent,

        NatureEnseignementCreateAdminComponent,
        NatureEnseignementListAdminComponent,
        NatureEnseignementViewAdminComponent,
        NatureEnseignementEditAdminComponent,

        NiveauFormationPostBacCreateAdminComponent,
        NiveauFormationPostBacListAdminComponent,
        NiveauFormationPostBacViewAdminComponent,
        NiveauFormationPostBacEditAdminComponent,

        NiveauRespPedCreateAdminComponent,
        NiveauRespPedListAdminComponent,
        NiveauRespPedViewAdminComponent,
        NiveauRespPedEditAdminComponent,

        ObjetFormationGeneriqueCreateAdminComponent,
        ObjetFormationGeneriqueListAdminComponent,
        ObjetFormationGeneriqueViewAdminComponent,
        ObjetFormationGeneriqueEditAdminComponent,

        OrganismeCreateAdminComponent,
        OrganismeListAdminComponent,
        OrganismeViewAdminComponent,
        OrganismeEditAdminComponent,

        PartenaireCreateAdminComponent,
        PartenaireListAdminComponent,
        PartenaireViewAdminComponent,
        PartenaireEditAdminComponent,

        PubliqueProfessionelCreateAdminComponent,
        PubliqueProfessionelListAdminComponent,
        PubliqueProfessionelViewAdminComponent,
        PubliqueProfessionelEditAdminComponent,

        ResponsabiliteEncadrementDoctorantCreateAdminComponent,
        ResponsabiliteEncadrementDoctorantListAdminComponent,
        ResponsabiliteEncadrementDoctorantViewAdminComponent,
        ResponsabiliteEncadrementDoctorantEditAdminComponent,

        ResponsabiliteEncadrementEtudiantCreateAdminComponent,
        ResponsabiliteEncadrementEtudiantListAdminComponent,
        ResponsabiliteEncadrementEtudiantViewAdminComponent,
        ResponsabiliteEncadrementEtudiantEditAdminComponent,

        RoleDeveloppementDeSavoirCreateAdminComponent,
        RoleDeveloppementDeSavoirListAdminComponent,
        RoleDeveloppementDeSavoirViewAdminComponent,
        RoleDeveloppementDeSavoirEditAdminComponent,

        RoleEvaluationRechercheUniversitaireCreateAdminComponent,
        RoleEvaluationRechercheUniversitaireListAdminComponent,
        RoleEvaluationRechercheUniversitaireViewAdminComponent,
        RoleEvaluationRechercheUniversitaireEditAdminComponent,

        StatusContratEtConventionCreateAdminComponent,
        StatusContratEtConventionListAdminComponent,
        StatusContratEtConventionViewAdminComponent,
        StatusContratEtConventionEditAdminComponent,

        StatusCursusCreateAdminComponent,
        StatusCursusListAdminComponent,
        StatusCursusViewAdminComponent,
        StatusCursusEditAdminComponent,

        TypeEtudeCreateAdminComponent,
        TypeEtudeListAdminComponent,
        TypeEtudeViewAdminComponent,
        TypeEtudeEditAdminComponent,


    ],
    imports: [
        ProgressSpinnerModule,
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        DragDropModule,
        AccordionModule,
        PickListModule,
        RadioButtonModule,
        ToolsModule,
        GestionEquipeListAdminModule,
        TooltipModule,
        I18NextModule,
        SharedModule,
        SplitterModule,
    ],
    exports: [
        EmailRelanceComponent,
        EmailRelanceComponent,
        LoginAdminComponent,
        RegisterAdminComponent,
        OutilFormationContinueCreateAdminComponent,
        OutilFormationContinueListAdminComponent,
        OutilFormationContinueViewAdminComponent,
        OutilFormationContinueEditAdminComponent,
        OutilFormationContinueAdminComponent,
        FinancementDoctorantCreateAdminComponent,
        FinancementDoctorantListAdminComponent,
        FinancementDoctorantViewAdminComponent,
        FinancementDoctorantEditAdminComponent,
        FinancementDoctorantAdminComponent,
        GradeCreateAdminComponent,
        GradeListAdminComponent,
        GradeViewAdminComponent,
        GradeEditAdminComponent,
        GradeAdminComponent,
        EncadrementDoctorantCreateAdminComponent,
        EncadrementDoctorantListAdminComponent,
        EncadrementDoctorantViewAdminComponent,
        EncadrementDoctorantEditAdminComponent,
        EncadrementDoctorantAdminComponent,
        PublicCibleCreateAdminComponent,
        PublicCibleListAdminComponent,
        PublicCibleViewAdminComponent,
        PublicCibleEditAdminComponent,
        PublicCibleAdminComponent,
        FormationContinueCreateAdminComponent,
        FormationContinueListAdminComponent,
        FormationContinueViewAdminComponent,
        FormationContinueEditAdminComponent,
        FormationContinueAdminComponent,
        PaysCreateAdminComponent,
        PaysListAdminComponent,
        PaysViewAdminComponent,
        PaysEditAdminComponent,
        PaysAdminComponent,
        TemplateRelanceCreateAdminComponent,
        TemplateRelanceListAdminComponent,
        TemplateRelanceViewAdminComponent,
        TemplateRelanceEditAdminComponent,
        TemplateRelanceAdminComponent,
        ConseilEtComiteScientifiqueCreateAdminComponent,
        ConseilEtComiteScientifiqueListAdminComponent,
        ConseilEtComiteScientifiqueViewAdminComponent,
        ConseilEtComiteScientifiqueEditAdminComponent,
        ConseilEtComiteScientifiqueAdminComponent,
        EtablissementPartenaireCreateAdminComponent,
        EtablissementPartenaireListAdminComponent,
        EtablissementPartenaireViewAdminComponent,
        EtablissementPartenaireEditAdminComponent,
        EvenementColloqueScienntifiqueCreateAdminComponent,
        EvenementColloqueScienntifiqueListAdminComponent,
        EvenementColloqueScienntifiqueViewAdminComponent,
        EvenementColloqueScienntifiqueEditAdminComponent,
        EvenementColloqueScienntifiqueAdminComponent,
        ResponsabiliteEncadrementEtudiantCreateAdminComponent,
        ResponsabiliteEncadrementEtudiantListAdminComponent,
        ResponsabiliteEncadrementEtudiantViewAdminComponent,
        ResponsabiliteEncadrementEtudiantEditAdminComponent,
        MasterInternationalCreateAdminComponent,
        MasterInternationalListAdminComponent,
        MasterInternationalViewAdminComponent,
        MasterInternationalEditAdminComponent,
        MasterInternationalAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
        DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
        TypeExpertCreateAdminComponent,
        TypeExpertListAdminComponent,
        TypeExpertViewAdminComponent,
        TypeExpertEditAdminComponent,
        TypeExpertAdminComponent,
        IdentifiantAuteurExpertCreateAdminComponent,
        IdentifiantAuteurExpertListAdminComponent,
        IdentifiantAuteurExpertViewAdminComponent,
        IdentifiantAuteurExpertEditAdminComponent,
        IdentifiantAuteurExpertAdminComponent,
        CampagneChercheurCreateAdminComponent,
        CampagneChercheurListAdminComponent,
        CampagneChercheurViewAdminComponent,
        CampagneChercheurEditAdminComponent,
        CampagneChercheurAdminComponent,
        VieInstitutionnelleDetailAdminComponent,
        VieInstitutionnelleDetailCreateAdminComponent,
        VieInstitutionnelleDetailEditAdminComponent,
        VieInstitutionnelleDetailListAdminComponent,
        VieInstitutionnelleDetailViewAdminComponent,
        VieInstitutionnelleCreateAdminComponent,
        VieInstitutionnelleListAdminComponent,
        VieInstitutionnelleViewAdminComponent,
        VieInstitutionnelleEditAdminComponent,
        VieInstitutionnelleAdminComponent,
        InstrumentIrdCreateAdminComponent,
        InstrumentIrdListAdminComponent,
        InstrumentIrdViewAdminComponent,
        InstrumentIrdEditAdminComponent,
        InstrumentIrdAdminComponent,
        TypeInstrumentIrdCreateAdminComponent,
        TypeInstrumentIrdListAdminComponent,
        TypeInstrumentIrdViewAdminComponent,
        TypeInstrumentIrdEditAdminComponent,
        TypeInstrumentIrdAdminComponent,
        StructureIrdCreateAdminComponent,
        StructureIrdListAdminComponent,
        StructureIrdViewAdminComponent,
        StructureIrdEditAdminComponent,
        StructureIrdAdminComponent,
        CommunauteSavoirChercheurCreateAdminComponent,
        CommunauteSavoirChercheurListAdminComponent,
        CommunauteSavoirChercheurViewAdminComponent,
        CommunauteSavoirChercheurEditAdminComponent,
        CommunauteSavoirChercheurAdminComponent,
        EcoleDoctoraleCreateAdminComponent,
        EcoleDoctoraleListAdminComponent,
        EcoleDoctoraleViewAdminComponent,
        EcoleDoctoraleEditAdminComponent,
        EcoleDoctoraleAdminComponent,
        EtablissementCreateAdminComponent,
        EtablissementListAdminComponent,
        EtablissementViewAdminComponent,
        EtablissementEditAdminComponent,
        EtablissementAdminComponent,
        ModeDiffusionCreateAdminComponent,
        ModeDiffusionListAdminComponent,
        ModeDiffusionViewAdminComponent,
        ModeDiffusionEditAdminComponent,
        ModeDiffusionAdminComponent,
        EncadrementEtudiantCreateAdminComponent,
        EncadrementEtudiantListAdminComponent,
        EncadrementEtudiantViewAdminComponent,
        EncadrementEtudiantEditAdminComponent,
        EncadrementEtudiantAdminComponent,
        TemplateClotureCreateAdminComponent,
        TemplateClotureListAdminComponent,
        TemplateClotureViewAdminComponent,
        TemplateClotureEditAdminComponent,
        TemplateClotureAdminComponent,
        InstitutionCreateAdminComponent,
        InstitutionListAdminComponent,
        InstitutionViewAdminComponent,
        InstitutionEditAdminComponent,
        InstitutionAdminComponent,
        EnjeuxIrdCreateAdminComponent,
        EnjeuxIrdListAdminComponent,
        EnjeuxIrdViewAdminComponent,
        EnjeuxIrdEditAdminComponent,
        EnjeuxIrdAdminComponent,
        EtatReclamationCreateAdminComponent,
        EtatReclamationListAdminComponent,
        EtatReclamationViewAdminComponent,
        EtatReclamationEditAdminComponent,
        EtatReclamationAdminComponent,
        ResponsabilitePedagogiqueMasterCreateAdminComponent,
        ResponsabilitePedagogiqueMasterListAdminComponent,
        ResponsabilitePedagogiqueMasterViewAdminComponent,
        ResponsabilitePedagogiqueMasterEditAdminComponent,
        ResponsabilitePedagogiqueMasterAdminComponent,
        CultureSciRecontreGpjpAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicListAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicViewAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicEditAdminComponent,
        CultureScientifiqueRecontreGrandPublicJeunePublicAdminComponent,
        EtudiantCreateAdminComponent,
        EtudiantListAdminComponent,
        EtudiantViewAdminComponent,
        EtudiantEditAdminComponent,
        EtudiantAdminComponent,
        EtatEtapeCampagneCreateAdminComponent,
        EtatEtapeCampagneListAdminComponent,
        EtatEtapeCampagneViewAdminComponent,
        EtatEtapeCampagneEditAdminComponent,
        EtatEtapeCampagneAdminComponent,
        EtatCampagneCreateAdminComponent,
        EtatCampagneListAdminComponent,
        EtatCampagneViewAdminComponent,
        EtatCampagneEditAdminComponent,
        EtatCampagneAdminComponent,
        IdentifiantRechercheCreateAdminComponent,
        IdentifiantRechercheListAdminComponent,
        IdentifiantRechercheViewAdminComponent,
        IdentifiantRechercheEditAdminComponent,
        IdentifiantRechercheAdminComponent,
        TypeInstrumentsEtDispositifsIrdCreateAdminComponent,
        TypeInstrumentsEtDispositifsIrdListAdminComponent,
        TypeInstrumentsEtDispositifsIrdViewAdminComponent,
        TypeInstrumentsEtDispositifsIrdEditAdminComponent,
        TypeInstrumentsEtDispositifsIrdAdminComponent,
        ResponsabiliteEncadrementDoctorantCreateAdminComponent,
        ResponsabiliteEncadrementDoctorantListAdminComponent,
        ResponsabiliteEncadrementDoctorantViewAdminComponent,
        ResponsabiliteEncadrementDoctorantEditAdminComponent,
        PubliquePrincipalCreateAdminComponent,
        PubliquePrincipalListAdminComponent,
        PubliquePrincipalViewAdminComponent,
        PubliquePrincipalEditAdminComponent,
        PubliquePrincipalAdminComponent,
        DoctorantCreateAdminComponent,
        DoctorantListAdminComponent,
        DoctorantViewAdminComponent,
        DoctorantEditAdminComponent,
        DoctorantAdminComponent,
        InstrumentsEtDispositifsIrdCreateAdminComponent,
        InstrumentsEtDispositifsIrdListAdminComponent,
        InstrumentsEtDispositifsIrdViewAdminComponent,
        InstrumentsEtDispositifsIrdEditAdminComponent,
        InstrumentsEtDispositifsIrdAdminComponent,
        ObjetGlobalCreateAdminComponent,
        ObjetGlobalListAdminComponent,
        ObjetGlobalViewAdminComponent,
        ObjetGlobalEditAdminComponent,
        ObjetGlobalAdminComponent,
        EvaluationRechercheUniversitaireCreateAdminComponent,
        EvaluationRechercheUniversitaireListAdminComponent,
        EvaluationRechercheUniversitaireViewAdminComponent,
        EvaluationRechercheUniversitaireEditAdminComponent,
        EvalRechercheUnivAdminComponent,
        ModaliteFormationContinueCreateAdminComponent,
        ModaliteFormationContinueListAdminComponent,
        ModaliteFormationContinueViewAdminComponent,
        ModaliteFormationContinueEditAdminComponent,
        ModaliteFormationContinueAdminComponent,
        FormatRencontreCreateAdminComponent,
        FormatRencontreListAdminComponent,
        FormatRencontreViewAdminComponent,
        FormatRencontreEditAdminComponent,
        FormatRencontreAdminComponent,
        VilleCreateAdminComponent,
        VilleListAdminComponent,
        VilleViewAdminComponent,
        VilleEditAdminComponent,
        VilleAdminComponent,
        StatusProjetCreateAdminComponent,
        StatusProjetListAdminComponent,
        StatusProjetViewAdminComponent,
        StatusProjetEditAdminComponent,
        StatusProjetAdminComponent,
        ContinentCreateAdminComponent,
        ContinentListAdminComponent,
        ContinentViewAdminComponent,
        ContinentEditAdminComponent,
        ContinentAdminComponent,
        StatutEcoleDoctoraleCreateAdminComponent,
        StatutEcoleDoctoraleListAdminComponent,
        StatutEcoleDoctoraleViewAdminComponent,
        StatutEcoleDoctoraleEditAdminComponent,
        StatutEcoleDoctoraleAdminComponent,
        FournisseurAppelProjetRechercheCreateAdminComponent,
        FournisseurAppelProjetRechercheListAdminComponent,
        FournisseurAppelProjetRechercheViewAdminComponent,
        FournisseurAppelProjetRechercheEditAdminComponent,
        FournisseurAppelProjetRechercheAdminComponent,
        ModaliteCreateAdminComponent,
        ModaliteListAdminComponent,
        ModaliteViewAdminComponent,
        ModaliteEditAdminComponent,
        ModaliteAdminComponent,
        CaracterisationCreateAdminComponent,
        CaracterisationListAdminComponent,
        CaracterisationViewAdminComponent,
        CaracterisationEditAdminComponent,
        CaracterisationAdminComponent,
        TypeReclamationCreateAdminComponent,
        TypeReclamationListAdminComponent,
        TypeReclamationViewAdminComponent,
        TypeReclamationEditAdminComponent,
        TypeReclamationAdminComponent,
        CommunauteSavoirCreateAdminComponent,
        CommunauteSavoirListAdminComponent,
        CommunauteSavoirViewAdminComponent,
        CommunauteSavoirEditAdminComponent,
        CommunauteSavoirAdminComponent,
        TypeEnseignementDispenseCreateAdminComponent,
        TypeEnseignementDispenseListAdminComponent,
        TypeEnseignementDispenseViewAdminComponent,
        TypeEnseignementDispenseEditAdminComponent,
        TypeEnseignementDispenseAdminComponent,
        EtablissementProjetCreateAdminComponent,
        EtablissementProjetListAdminComponent,
        EtablissementProjetViewAdminComponent,
        EtablissementProjetEditAdminComponent,
        EtablissementProjetAdminComponent,
        EnseignementCreateAdminComponent,
        EnseignementListAdminComponent,
        EnseignementViewAdminComponent,
        EnseignementEditAdminComponent,
        EnseignementAdminComponent,
        BourseCreateAdminComponent,
        BourseListAdminComponent,
        BourseViewAdminComponent,
        BourseEditAdminComponent,
        BourseAdminComponent,
        EntiteAdministrativeCreateAdminComponent,
        EntiteAdministrativeListAdminComponent,
        EntiteAdministrativeViewAdminComponent,
        EntiteAdministrativeEditAdminComponent,
        EntiteAdministrativeAdminComponent,
        GestionEquipeCreateAdminComponent,
        GestionEquipeListAdminComponent,
        GestionEquipeViewAdminComponent,
        GestionEquipeEditAdminComponent,
        GestionEquipeAdminComponent,
        DistinctionCreateAdminComponent,
        DistinctionListAdminComponent,
        DistinctionViewAdminComponent,
        DistinctionEditAdminComponent,
        DistinctionAdminComponent,
        NiveauFormationCreateAdminComponent,
        NiveauFormationListAdminComponent,
        NiveauFormationViewAdminComponent,
        NiveauFormationEditAdminComponent,
        NiveauFormationAdminComponent,
        CultureScientifiqueOutilPedagogiqueCreateAdminComponent,
        CultureSciOutilPedaListAdmin,
        CultureScientifiqueOutilPedagogiqueViewAdminComponent,
        CultureScientifiqueOutilPedagogiqueEditAdminComponent,
        CultureSciOutilPedaAdmin,
        CategorieFaqCreateAdminComponent,
        CategorieFaqListAdminComponent,
        CategorieFaqViewAdminComponent,
        CategorieFaqEditAdminComponent,
        CategorieFaqAdminComponent,
        TemplateOuvertureCreateAdminComponent,
        TemplateOuvertureListAdminComponent,
        TemplateOuvertureViewAdminComponent,
        TemplateOuvertureEditAdminComponent,
        TemplateOuvertureAdminComponent,
        CommissionScientifiqueCreateAdminComponent,
        CommisScienListAdminComponent,
        CommissionScientifiqueViewAdminComponent,
        CommisScienEditAdminComponent,
        CommissionScientifiqueAdminComponent,
        StatutMasterCreateAdminComponent,
        StatutMasterListAdminComponent,
        StatutMasterViewAdminComponent,
        StatutMasterEditAdminComponent,
        StatutMasterAdminComponent,
        RoleEvaluationRechercheUniversitaireCreateAdminComponent,
        RoleEvaluationRechercheUniversitaireListAdminComponent,
        RoleEvaluationRechercheUniversitaireViewAdminComponent,
        RoleEvaluationRechercheUniversitaireEditAdminComponent,
        ReclamationCreateAdminComponent,
        ReclamationListAdminComponent,
        ReclamationViewAdminComponent,
        ReclamationEditAdminComponent,
        ReclamationAdminComponent,
        OrganismeCreateAdminComponent,
        OrganismeListAdminComponent,
        OrganismeViewAdminComponent,
        OrganismeEditAdminComponent,
        RoleProjetCreateAdminComponent,
        RoleProjetListAdminComponent,
        RoleProjetViewAdminComponent,
        RoleProjetEditAdminComponent,
        RoleProjetAdminComponent,
        TypeExpertiseCreateAdminComponent,
        TypeExpertiseListAdminComponent,
        TypeExpertiseViewAdminComponent,
        TypeExpertiseEditAdminComponent,
        TypeExpertiseAdminComponent,
        NationaliteCreateAdminComponent,
        NationaliteListAdminComponent,
        NationaliteViewAdminComponent,
        NationaliteEditAdminComponent,
        NationaliteAdminComponent,
        DepartementScientifiqueCreateAdminComponent,
        DepartementScientifiqueListAdminComponent,
        DepartementScientifiqueViewAdminComponent,
        DepartementScientifiqueEditAdminComponent,
        DepartementScientifiqueAdminComponent,
        NiveauEtudeCreateAdminComponent,
        NiveauEtudeListAdminComponent,
        NiveauEtudeViewAdminComponent,
        NiveauEtudeEditAdminComponent,
        NiveauEtudeAdminComponent,
        TypeInstanceCreateAdminComponent,
        TypeInstanceListAdminComponent,
        TypeInstanceViewAdminComponent,
        TypeInstanceEditAdminComponent,
        TypeInstanceAdminComponent,
        NatureEtudeCreateAdminComponent,
        NatureEtudeListAdminComponent,
        NatureEtudeViewAdminComponent,
        NatureEtudeEditAdminComponent,
        NatureEtudeAdminComponent,
        DisciplineScientifiqueCreateAdminComponent,
        DisciplineScientifiqueListAdminComponent,
        DisciplineScientifiqueViewAdminComponent,
        DisciplineScientifiqueEditAdminComponent,
        DisciplineScientifiqueAdminComponent,
        ContexteCreateAdminComponent,
        ContexteListAdminComponent,
        ContexteViewAdminComponent,
        ContexteEditAdminComponent,
        ContexteAdminComponent,
        EvaluationEncadrementCreateAdminComponent,
        EvaluationEncadrementListAdminComponent,
        EvaluationEncadrementViewAdminComponent,
        EvaluationEncadrementEditAdminComponent,
        EvaluationEncadrementAdminComponent,
        MasterCreateAdminComponent,
        MasterListAdminComponent,
        MasterViewAdminComponent,
        MasterEditAdminComponent,
        MasterAdminComponent,
        TypeSavoirCreateAdminComponent,
        TypeSavoirListAdminComponent,
        TypeSavoirViewAdminComponent,
        TypeSavoirEditAdminComponent,
        TypeSavoirAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleCreateAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleListAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleViewAdminComponent,
        ResponsabilitePedagogiqueEcoleDoctoraleEditAdminComponent,
        RespPedEcoleDoctoraleAdminComponent,
        DomaineScientifiqueCreateAdminComponent,
        DomaineScientifiqueListAdminComponent,
        DomaineScientifiqueViewAdminComponent,
        DomaineScientifiqueEditAdminComponent,
        DomaineScientifiqueAdminComponent,
        TypeEntiteAdministrativeCreateAdminComponent,
        TypeEntiteAdministrativeListAdminComponent,
        TypeEntiteAdministrativeViewAdminComponent,
        TypeEntiteAdministrativeEditAdminComponent,
        TypeEntiteAdministrativeAdminComponent,
        CorpsCreateAdminComponent,
        CorpsListAdminComponent,
        CorpsViewAdminComponent,
        CorpsEditAdminComponent,
        CorpsAdminComponent,
        SexeCreateAdminComponent,
        SexeListAdminComponent,
        SexeViewAdminComponent,
        SexeEditAdminComponent,
        SexeAdminComponent,
        ModaliteEtudeCreateAdminComponent,
        ModaliteEtudeListAdminComponent,
        ModaliteEtudeViewAdminComponent,
        ModaliteEtudeEditAdminComponent,
        ModaliteEtudeAdminComponent,
        TemplateRappelCreateAdminComponent,
        TemplateRappelListAdminComponent,
        TemplateRappelViewAdminComponent,
        TemplateRappelEditAdminComponent,
        TemplateRappelAdminComponent,
        TypeOutilCreateAdminComponent,
        TypeOutilListAdminComponent,
        TypeOutilViewAdminComponent,
        TypeOutilEditAdminComponent,
        TypeOutilAdminComponent,
        FaqCreateAdminComponent,
        FaqListAdminComponent,
        FaqViewAdminComponent,
        FaqEditAdminComponent,
        FaqAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        ExpertiseScientifiqueCreateAdminComponent,
        ExpertiseScientifiqueListAdminComponent,
        ExpertiseScientifiqueViewAdminComponent,
        ExpertiseScientifiqueEditAdminComponent,
        ExpertiseScientifiqueAdminComponent,
        CampagneCreateAdminComponent,
        CampagneListAdminComponent,
        CampagneViewAdminComponent,
        CampagneEditAdminComponent,
        CampagneAdminComponent,
        EtatCampagneChercheurCreateAdminComponent,
        EtatCampagneChercheurListAdminComponent,
        EtatCampagneChercheurViewAdminComponent,
        EtatCampagneChercheurEditAdminComponent,
        EtatCampagneChercheurAdminComponent,
        CampagneSendEmailRelanceComponent,
        SwitchChercheurAdminComponent,
        TypePubliqueCreateAdminComponent,
        TypePubliqueListAdminComponent,
        TypePubliqueViewAdminComponent,
        TypePubliqueEditAdminComponent,
        TypePubliqueAdminComponent,
        LangueCreateAdminComponent,
        LangueListAdminComponent,
        LangueViewAdminComponent,
        LangueEditAdminComponent,
        LangueAdminComponent,
        NatureActiviteGrandPubliqueCreateAdminComponent,
        NatureActiviteGrandPubliqueListAdminComponent,
        NatureActiviteGrandPubliqueViewAdminComponent,
        NatureActiviteGrandPubliqueEditAdminComponent,
        TypeUtilisateurCreateAdminComponent,
        TypeUtilisateurListAdminComponent,
        TypeUtilisateurViewAdminComponent,
        TypeUtilisateurEditAdminComponent,
        TypeUtilisateurAdminComponent,
        TypeParticipationCreateAdminComponent,
        TypeParticipationListAdminComponent,
        TypeParticipationViewAdminComponent,
        TypeParticipationEditAdminComponent,
        TypeParticipationAdminComponent,
        SemanticRelationshipCreateAdminComponent,
        SemanticRelationshipListAdminComponent,
        SemanticRelationshipViewAdminComponent,
        SemanticRelationshipEditAdminComponent,
        SemanticRelationshipAdminComponent,
        KeyWordCreateAdminComponent,
        KeyWordListAdminComponent,
        KeyWordViewAdminComponent,
        KeyWordEditAdminComponent,
        KeyWordAdminComponent,
        KeyWordDisciplineScientifiqueErcCreateAdminComponent,
        KeyWordDisciplineScientifiqueErcListAdminComponent,
        KeyWordDisciplineScientifiqueErcViewAdminComponent,
        KeyWordDisciplineScientifiqueErcEditAdminComponent,
        KeyWordDisciplineScientifiqueErcAdminComponent,
        DisciplineScientifiqueErcAssociationCreateAdminComponent,
        DisciplineScientifiqueErcAssociationListAdminComponent,
        DisciplineScientifiqueErcAssociationViewAdminComponent,
        DisciplineScientifiqueErcAssociationEditAdminComponent,
        DisciplineScientifiqueErcAssociationAdminComponent,
        DisciplineScientifiqueErcCreateAdminComponent,
        DisciplineScientifiqueErcListAdminComponent,
        DisciplineScientifiqueErcViewAdminComponent,
        DisciplineScientifiqueErcEditAdminComponent,
        DisciplineScientifiqueErcAdminComponent

    ],
    entryComponents: [],
})
export class AdminModule {
}
