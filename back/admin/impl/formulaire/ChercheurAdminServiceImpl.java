package com.ird.faa.service.admin.impl.formulaire;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;

import com.ird.faa.bean.formulaire.*;
import com.ird.faa.bean.referentiel.*;
import com.ird.faa.dao.formulaire.*;
import com.ird.faa.dao.impl.ChercheurDaoImpl;
import com.ird.faa.security.bean.User;
import com.ird.faa.service.admin.facade.referentiel.*;
import com.ird.faa.ws.rest.provided.vo.formulaire.ChercheurVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.ird.faa.security.bean.Role;
import com.ird.faa.security.common.AuthoritiesConstants;
import com.ird.faa.security.dao.UserDao;
import com.ird.faa.security.service.facade.RoleService;
import com.ird.faa.security.service.facade.UserService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurEmailAdminService;
import com.ird.faa.service.admin.facade.formulaire.DepartementScientifiqueChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.InstrumentIrdChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.TypeInstrumentIrdChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.ChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.CommissionScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.CommunauteSavoirChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.DepartementScientifiqueAdminService;
import com.ird.faa.service.admin.facade.formulaire.EnjeuxIrdChercheurAdminService;
import com.ird.faa.service.admin.facade.formulaire.IdentifiantAuteurExpertAdminService;
import com.ird.faa.service.admin.facade.formulaire.ZoneActiviteInteractionRechercheAdminService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;
import com.ird.faa.service.util.ListUtil;
import com.ird.faa.service.util.SearchUtil;
import com.ird.faa.service.util.StringUtil;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ChercheurAdminServiceImpl extends AbstractServiceImpl<Chercheur> implements ChercheurAdminService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleService roleService;

	@Autowired
	UserService userService;

	@Autowired
	private ChercheurDao chercheurDao;

	@Autowired
	private CommunauteSavoirChercheurAdminService communauteSavoirChercheurService;
	@Autowired
	private TypeEntiteAdministrativeAdminService typeEntiteAdministrativeService;
	@Autowired
	private DepartementScientifiqueAdminService departementScientifiqueService;
	@Autowired
	private ZoneActiviteInteractionRechercheAdminService zoneActiviteInteractionRechercheService;
	@Autowired
	private GradeAdminService gradeService;
	@Autowired
	private CorpsAdminService corpsService;
	@Autowired
	private CommissionScientifiqueAdminService commissionScientifiqueService;
	@Autowired
	private PaysAdminService paysService;

	@Autowired
	private IdentifiantAuteurExpertDao identifiantAuteurExpertDao;
	@Autowired
	private DistinctionDao distinctionDao;



	@Autowired
	private ChercheurDaoImpl chercheurDaoImpl;


	@Autowired
	private IdentifiantAuteurExpertAdminService identifiantAuteurExpertService;

	@Autowired
	private EntiteAdministrativeAdminService entiteAdministrativeService;
	@Autowired
	private ChercheurEmailAdminService chercheurEmailService;
	@Autowired
	private SexeAdminService sexeService;
	@Autowired
	private VilleAdminService villeService;
	@Autowired
	private DisciplineScientifiqueChercheurAdminService disciplineScientifiqueChercheurService;

	@Autowired
	private CampagneChercheurOuvertureDao campagneChercheurOuvertureDao;
	@Autowired
	private AffectationStructurelleAdminService affectationStructurelleService;
	@Autowired
	private EnjeuxIrdChercheurAdminService enjeuxIrdChercheurService;
	@Autowired
	private InstrumentIrdChercheurAdminService instrumentIrdChercheurService;
	@Autowired
	private TypeInstrumentIrdChercheurAdminService typeInstrumentIrdChercheurService;
	@Autowired
	private EntityManager entityManager;
	@Autowired
	private DepartementScientifiqueChercheurAdminService departementScientifiqueChercheurService ;
	@Autowired
	private DisciplineScientifiqueChercheurDao disciplineScientifiqueChercheurDao ;


	@Override
	public Chercheur findByEmail(String email) {
		return chercheurDao.findByEmail(email);
	}

	private List<User> addRoleToUsers() {
		List<User> users = userService.findAll();
		for (User user : users) {
			if (user.getPasswordChanged())
				user.setRole("Pilot");
			else
				user.setRole("Admin");
		}
		return users;
	}

	@Override
	public Set<User> findAllUserWithSet() {
		List<User> userBasedOnChercheur = userService.findUserBasedOnChercheur(chercheurDaoImpl.getAllChercheurs());
		List<User> users = addRoleToUsers();
		return ListUtil.toSet(users,userBasedOnChercheur);
	}

	@Override
	public int count(String username) {
		int result = 0;
		Chercheur chercheur = findByUsername(username);
		Long identifiantLength = identifiantAuteurExpertDao.countByChercheurUsername(username);
		Long distinctionLength = distinctionDao.countByChercheurUsername(username);
		Long disciplinelength = disciplineScientifiqueChercheurDao.countByChercheurUsername(username);
		if(chercheur.getNumeroMatricule() != null || chercheur.getNomNaissance() != null || chercheur.getNom() != null || chercheur.getPrenom() != null)
			result++;
		if(chercheur.getResume()!=null || disciplinelength >= 4)
			result++;
		if(distinctionLength >= 4)
			result++;
		if(identifiantLength >= 4)
			result++;

		return result;
	}

	@Override
	public Chercheur findByUsername(String username) {
		return chercheurDao.findByUsername(username);
	}

	@Override
	public List<Chercheur> findAll() {
		return chercheurDao.findAll();
	}

	@Override
	public List<Chercheur> findByTypeEntiteAdministrativeCode(String code) {
		return chercheurDao.findByTypeEntiteAdministrativeCode(code);
	}

	@Override
	@Transactional
	public int deleteByTypeEntiteAdministrativeCode(String code) {
		return chercheurDao.deleteByTypeEntiteAdministrativeCode(code);
	}

	@Override
	public List<Chercheur> findByTypeEntiteAdministrativeId(Long id) {
		return chercheurDao.findByTypeEntiteAdministrativeId(id);
	}

	@Override
	@Transactional
	public int deleteByTypeEntiteAdministrativeId(Long id) {
		return chercheurDao.deleteByTypeEntiteAdministrativeId(id);
	}

	@Override
	public List<Chercheur> findByEntiteAdministrativeCode(String code) {
		return chercheurDao.findByEntiteAdministrativeCode(code);
	}

	@Override
	@Transactional
	public int deleteByEntiteAdministrativeCode(String code) {
		return chercheurDao.deleteByEntiteAdministrativeCode(code);
	}

	@Override
	public List<Chercheur> findByEntiteAdministrativeId(Long id) {
		return chercheurDao.findByEntiteAdministrativeId(id);
	}

	@Override
	@Transactional
	public int deleteByEntiteAdministrativeId(Long id) {
		return chercheurDao.deleteByEntiteAdministrativeId(id);
	}

	@Override
	public List<Chercheur> findByPaysCode(String code) {
		return chercheurDao.findByPaysCode(code);
	}

	@Override
	@Transactional
	public int deleteByPaysCode(String code) {
		return chercheurDao.deleteByPaysCode(code);
	}

	@Override
	public List<Chercheur> findByPaysId(Long id) {
		return chercheurDao.findByPaysId(id);
	}

	@Override
	@Transactional
	public int deleteByPaysId(Long id) {
		return chercheurDao.deleteByPaysId(id);
	}

	@Override
	public List<Chercheur> findByVilleCode(String code) {
		return chercheurDao.findByVilleCode(code);
	}

	@Override
	@Transactional
	public int deleteByVilleCode(String code) {
		return chercheurDao.deleteByVilleCode(code);
	}

	@Override
	public List<Chercheur> findByVilleId(Long id) {
		return chercheurDao.findByVilleId(id);
	}

	@Override
	@Transactional
	public int deleteByVilleId(Long id) {
		return chercheurDao.deleteByVilleId(id);
	}

	@Override
	public List<Chercheur> findByDepartementScientifiqueCode(String code) {
		return chercheurDao.findByDepartementScientifiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByDepartementScientifiqueCode(String code) {
		return chercheurDao.deleteByDepartementScientifiqueCode(code);
	}

	@Override
	public List<Chercheur> findByDepartementScientifiqueId(Long id) {
		return chercheurDao.findByDepartementScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByDepartementScientifiqueId(Long id) {
		return chercheurDao.deleteByDepartementScientifiqueId(id);
	}

	@Override
	public List<Chercheur> findByCommissionScientifiqueCode(String code) {
		return chercheurDao.findByCommissionScientifiqueCode(code);
	}

	@Override
	@Transactional
	public int deleteByCommissionScientifiqueCode(String code) {
		return chercheurDao.deleteByCommissionScientifiqueCode(code);
	}

	@Override
	public List<Chercheur> findByCommissionScientifiqueId(Long id) {
		return chercheurDao.findByCommissionScientifiqueId(id);
	}

	@Override
	@Transactional
	public int deleteByCommissionScientifiqueId(Long id) {
		return chercheurDao.deleteByCommissionScientifiqueId(id);
	}

	@Override
	public List<Chercheur> findByGradeCode(String code) {
		return chercheurDao.findByGradeCode(code);
	}

	@Override
	@Transactional
	public int deleteByGradeCode(String code) {
		return chercheurDao.deleteByGradeCode(code);
	}

	@Override
	public List<Chercheur> findByGradeId(Long id) {
		return chercheurDao.findByGradeId(id);
	}

	@Override
	@Transactional
	public int deleteByGradeId(Long id) {
		return chercheurDao.deleteByGradeId(id);
	}

	@Override
	public List<Chercheur> findByCorpsCode(String code) {
		return chercheurDao.findByCorpsCode(code);
	}

	@Override
	@Transactional
	public int deleteByCorpsCode(String code) {
		return chercheurDao.deleteByCorpsCode(code);
	}

	@Override
	public List<Chercheur> findByCorpsId(Long id) {
		return chercheurDao.findByCorpsId(id);
	}

	@Override
	@Transactional
	public int deleteByCorpsId(Long id) {
		return chercheurDao.deleteByCorpsId(id);
	}

	@Override
	public List<Chercheur> findBySexeCode(String code) {
		return chercheurDao.findBySexeCode(code);
	}

	@Override
	@Transactional
	public int deleteBySexeCode(String code) {
		return chercheurDao.deleteBySexeCode(code);
	}

	@Override
	public List<Chercheur> findBySexeId(Long id) {
		return chercheurDao.findBySexeId(id);
	}

	@Override
	@Transactional
	public int deleteBySexeId(Long id) {
		return chercheurDao.deleteBySexeId(id);
	}

	@Override
	public Chercheur findByNumeroMatricule(String numeroMatricule) {
		if (numeroMatricule == null)
			return null;
		return chercheurDao.findByNumeroMatricule(numeroMatricule);
	}

	@Override
	@Transactional
	public int deleteByNumeroMatricule(String numeroMatricule) {
		return chercheurDao.deleteByNumeroMatricule(numeroMatricule);
	}

	@Override
	public Chercheur findByIdOrNumeroMatricule(Chercheur chercheur) {
		Chercheur resultat = null;
		if (chercheur == null || (chercheur.getNumeroMatricule() == null && chercheur.getId() == null))
			return resultat;
		else {
			if (chercheur.getId() != null) {
				resultat = chercheurDao.findById(chercheur.getId()).get();
			} else if (StringUtil.isNotEmpty(chercheur.getNumeroMatricule())) {
				resultat = chercheurDao.findByNumeroMatricule(chercheur.getNumeroMatricule());
			} else if (StringUtil.isNotEmpty(chercheur.getUsername())) {
				resultat = chercheurDao.findByUsername(chercheur.getUsername());
			}
			return resultat;
		}
	}

	@Override
	public Chercheur findById(Long id) {
		if (id == null)
			return null;
		return chercheurDao.getOne(id);
	}

	@Override
	public Chercheur findByIdWithAssociatedList(Long id) {
		Chercheur chercheur = findById(id);
		findAssociatedLists(chercheur);
		return chercheur;
	}

	private void findAssociatedLists(Chercheur chercheur) {
		if (chercheur == null || chercheur.getId() == null)
			return;
		else {
			List<ChercheurEmail> chercheurEmails = chercheurEmailService.findByChercheurId(chercheur.getId());
			chercheur.setChercheurEmails(chercheurEmails);

			List<DisciplineScientifiqueChercheur> disciplineScientifiqueChercheurs = disciplineScientifiqueChercheurService
					.findByChercheurId(chercheur.getId());
			chercheur.setDisciplineScientifiqueChercheurs(disciplineScientifiqueChercheurs);

			List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches = zoneActiviteInteractionRechercheService
					.findByChercheurId(chercheur.getId());
			chercheur.setZoneActiviteInteractionRecherches(zoneActiviteInteractionRecherches);

			List<EnjeuxIrdChercheur> enjeuxIrdChercheurs = enjeuxIrdChercheurService
					.findByChercheurId(chercheur.getId());
			chercheur.setEnjeuxIrdChercheurs(enjeuxIrdChercheurs);

			List<InstrumentIrdChercheur> instrumentIrdChercheurs = instrumentIrdChercheurService
					.findByChercheurId(chercheur.getId());
			chercheur.setInstrumentIrdChercheurs(instrumentIrdChercheurs);

			List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs = typeInstrumentIrdChercheurService
					.findByChercheurId(chercheur.getId());
			chercheur.setTypeInstrumentIrdChercheurs(typeInstrumentIrdChercheurs);

			List<CommunauteSavoirChercheur> communauteSavoirChercheurs = communauteSavoirChercheurService
					.findByChercheurId(chercheur.getId());
			chercheur.setCommunauteSavoirChercheurs(communauteSavoirChercheurs);

			List<IdentifiantAuteurExpert> identifiantAuteurExperts = identifiantAuteurExpertService
					.findByChercheurId(chercheur.getId());
			chercheur.setIdentifiantAuteurExperts(identifiantAuteurExperts);

			List<DepartementScientifiqueChercheur> departementScientifiqueChercheurs = departementScientifiqueChercheurService
					.findByChercheurId(chercheur.getId());
			chercheur.setDepartementScientifiqueChercheurs(departementScientifiqueChercheurs);
		}
	}

	private void deleteAssociatedLists(Long id) {
		if (id == null)
			return;
		else {
			chercheurEmailService.deleteByChercheurId(id);
			disciplineScientifiqueChercheurService.deleteByChercheurId(id);
			enjeuxIrdChercheurService.deleteByChercheurId(id);
			instrumentIrdChercheurService.deleteByChercheurId(id);
			typeInstrumentIrdChercheurService.deleteByChercheurId(id);
			zoneActiviteInteractionRechercheService.deleteByChercheurId(id);
			communauteSavoirChercheurService.deleteByChercheurId(id);
			identifiantAuteurExpertService.deleteByChercheurId(id);
		}
	}

	private void updateAssociatedLists(Chercheur chercheur) {
		if (chercheur == null || chercheur.getId() == null)
			return;
		else {
			List<List<ChercheurEmail>> resultChercheurEmails = chercheurEmailService.getToBeSavedAndToBeDeleted(
					chercheurEmailService.findByChercheurId(chercheur.getId()), chercheur.getChercheurEmails());
			chercheurEmailService.delete(resultChercheurEmails.get(1));
			associateChercheurEmail(chercheur, resultChercheurEmails.get(0));
			chercheurEmailService.update(resultChercheurEmails.get(0));

			List<List<DisciplineScientifiqueChercheur>> resultDisciplineScientifiqueChercheurs = disciplineScientifiqueChercheurService
					.getToBeSavedAndToBeDeleted(
							disciplineScientifiqueChercheurService.findByChercheurId(chercheur.getId()),
							chercheur.getDisciplineScientifiqueChercheurs());
			disciplineScientifiqueChercheurService.delete(resultDisciplineScientifiqueChercheurs.get(1));
			associateDisciplineScientifiqueChercheur(chercheur, resultDisciplineScientifiqueChercheurs.get(0));
			disciplineScientifiqueChercheurService.update(resultDisciplineScientifiqueChercheurs.get(0));

			List<List<ZoneActiviteInteractionRecherche>> resultZoneActiviteInteractionRecherches = zoneActiviteInteractionRechercheService
					.getToBeSavedAndToBeDeleted(
							zoneActiviteInteractionRechercheService.findByChercheurId(chercheur.getId()),
							chercheur.getZoneActiviteInteractionRecherches());
			zoneActiviteInteractionRechercheService.delete(resultZoneActiviteInteractionRecherches.get(1));
			associateZoneActiviteInteractionRecherche(chercheur, resultZoneActiviteInteractionRecherches.get(0));
			zoneActiviteInteractionRechercheService.update(resultZoneActiviteInteractionRecherches.get(0));

			List<List<InstrumentIrdChercheur>> resultInstrumentIrdChercheurs = instrumentIrdChercheurService
					.getToBeSavedAndToBeDeleted(instrumentIrdChercheurService.findByChercheurId(chercheur.getId()),
							chercheur.getInstrumentIrdChercheurs());
			instrumentIrdChercheurService.delete(resultInstrumentIrdChercheurs.get(1));
			associateInstrumentIrdChercheur(chercheur, resultInstrumentIrdChercheurs.get(0));
			instrumentIrdChercheurService.update(resultInstrumentIrdChercheurs.get(0));

			List<List<TypeInstrumentIrdChercheur>> resultTypeInstrumentIrdChercheurs = typeInstrumentIrdChercheurService
					.getToBeSavedAndToBeDeleted(typeInstrumentIrdChercheurService.findByChercheurId(chercheur.getId()),
							chercheur.getTypeInstrumentIrdChercheurs());
			typeInstrumentIrdChercheurService.delete(resultTypeInstrumentIrdChercheurs.get(1));
			associateTypeInstrumentIrdChercheur(chercheur, resultTypeInstrumentIrdChercheurs.get(0));
			typeInstrumentIrdChercheurService.update(resultTypeInstrumentIrdChercheurs.get(0));

			List<List<EnjeuxIrdChercheur>> resultEnjeuxIrdChercheurs = enjeuxIrdChercheurService
					.getToBeSavedAndToBeDeleted(enjeuxIrdChercheurService.findByChercheurId(chercheur.getId()),
							chercheur.getEnjeuxIrdChercheurs());
			enjeuxIrdChercheurService.delete(resultEnjeuxIrdChercheurs.get(1));
			associateEnjeuxIrdChercheur(chercheur, resultEnjeuxIrdChercheurs.get(0));
			enjeuxIrdChercheurService.update(resultEnjeuxIrdChercheurs.get(0));

			List<List<CommunauteSavoirChercheur>> resultCommunauteSavoirChercheurs = communauteSavoirChercheurService
					.getToBeSavedAndToBeDeleted(communauteSavoirChercheurService.findByChercheurId(chercheur.getId()),
							chercheur.getCommunauteSavoirChercheurs());
			communauteSavoirChercheurService.delete(resultCommunauteSavoirChercheurs.get(1));
			associateCommunauteSavoirChercheur(chercheur, resultCommunauteSavoirChercheurs.get(0));
			communauteSavoirChercheurService.update(resultCommunauteSavoirChercheurs.get(0));

			List<List<IdentifiantAuteurExpert>> resultIdentifiantAuteurExperts = identifiantAuteurExpertService
					.getToBeSavedAndToBeDeleted(identifiantAuteurExpertService.findByChercheurId(chercheur.getId()),
							chercheur.getIdentifiantAuteurExperts());
			identifiantAuteurExpertService.delete(resultIdentifiantAuteurExperts.get(1));
			associateIdentifiantAuteurExpert(chercheur, resultIdentifiantAuteurExperts.get(0));
			identifiantAuteurExpertService.update(resultIdentifiantAuteurExperts.get(0));

		}
	}

	private void associateInstrumentIrdChercheur(Chercheur chercheur,
												 List<InstrumentIrdChercheur> instrumentIrdChercheur) {
		if (ListUtil.isNotEmpty(instrumentIrdChercheur)) {
			instrumentIrdChercheur.forEach(e -> e.setChercheur(chercheur));
		}
	}

	private void associateDisciplineScientifiqueChercheur(Chercheur chercheur,
														  List<DisciplineScientifiqueChercheur> disciplineScientifiqueChercheur) {
		if (ListUtil.isNotEmpty(disciplineScientifiqueChercheur)) {
			disciplineScientifiqueChercheur.forEach(e -> e.setChercheur(chercheur));
		}
	}

	@Transactional
	public int deleteById(Long id) {
		if (chercheurDao.findById(id) == null)
			return 0;
		else {
			deleteAssociatedLists(id);
			chercheurDao.deleteById(id);
			return 1;
		}
	}

	@Override
	public Chercheur update(Chercheur chercheur) {
		Chercheur foundedChercheur = findById(chercheur.getId());
		User foundedUserByEmail = userService.findByEmail(chercheur.getEmail());
		Chercheur foundedChercheurByEmail = findByEmail(chercheur.getEmail());
		if (foundedChercheur == null)
			return null;
//		else if(foundedUserByEmail != null )
//		else if((foundedUserByEmail != null || foundedChercheurByEmail != null) && !chercheur.getEmail().equals(foundedChercheurByEmail.getEmail())){
//			throw new ResponseStatusException(HttpStatus.valueOf(512));
//		}

		else {
			prepare(chercheur);
			prepareChercheurUpdate(chercheur);
			updateAssociatedLists(chercheur);
			return chercheurDao.save(chercheur);
		}
	}

	private void prepareChercheurUpdate(Chercheur chercheur) {
		chercheur.setRoles(Arrays.asList(new Role(AuthoritiesConstants.chercheur)));
		if (chercheur.getRoles() != null) {
			Collection<Role> roles = new ArrayList<Role>();
			for (Role role : chercheur.getRoles()) {
				roles.add(roleService.save(role));
			}
			chercheur.setRoles(roles);
		}
	}

	private Chercheur preparedUser(Chercheur chercheur) {
		chercheur.setUsername(chercheur.getEmail());
		Chercheur foundedUserByUsername = findByUsername(chercheur.getUsername());
		if (foundedUserByUsername != null)
			return null;

		else {
			chercheur.setRoles(Arrays.asList(new Role(AuthoritiesConstants.chercheur)));
			userService.prepareUser(chercheur);
			return chercheur;
		}
	}

	@Override
	public Chercheur save(Chercheur chercheur) {

		Chercheur foundedChercheur = findByNumeroMatricule(chercheur.getNumeroMatricule());
		Chercheur foundedChercheurByEmail = findByEmail(chercheur.getEmail());
		User foundedUserByEmail = userService.findByEmail(chercheur.getEmail());
		if(foundedChercheur != null)
			return null;
//		else if (foundedChercheurByEmail != null || foundedUserByEmail != null) {
//			throw new ResponseStatusException(HttpStatus.valueOf(512));
//		}

		chercheur = preparedUser(chercheur);
		if (chercheur == null)
			return null;
		findAffectationStructurelle(chercheur);
		findTypeEntiteAdministrative(chercheur);
		findEntiteAdministrative(chercheur);
		findPays(chercheur);
		findPaysAffectationGeo(chercheur);
		findVille(chercheur);
		findDepartementScientifique(chercheur);
		findCommissionScientifique(chercheur);
		findGrade(chercheur);
		findCorps(chercheur);
		findSexe(chercheur);
		prepare(chercheur);

		Chercheur savedChercheur = chercheurDao.save(chercheur);
		saveChercheurEmails(savedChercheur, chercheur.getChercheurEmails());
		saveDisciplineScientifiqueChercheurs(savedChercheur, chercheur.getDisciplineScientifiqueChercheurs());
		saveEnjeuxIrdChercheurs(savedChercheur, chercheur.getEnjeuxIrdChercheurs());
		saveInstrumentIrdChercheurs(savedChercheur, chercheur.getInstrumentIrdChercheurs());
		saveTypeInstrumentIrdChercheurs(savedChercheur, chercheur.getTypeInstrumentIrdChercheurs());
		saveZoneActiviteInteractionRecherches(savedChercheur, chercheur.getZoneActiviteInteractionRecherches());
		saveCommunauteSavoirChercheurs(savedChercheur, chercheur.getCommunauteSavoirChercheurs());
		saveIdentifiantAuteurExperts(savedChercheur, chercheur.getIdentifiantAuteurExperts());

		return savedChercheur;
	}

	private void saveTypeInstrumentIrdChercheurs(Chercheur chercheur,
												 List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheurs) {

		if (ListUtil.isNotEmpty(chercheur.getTypeInstrumentIrdChercheurs())) {
			List<TypeInstrumentIrdChercheur> savedTypeInstrumentIrdChercheurs = new ArrayList<>();
			typeInstrumentIrdChercheurs.forEach(element -> {
				element.setChercheur(chercheur);
				typeInstrumentIrdChercheurService.save(element);
			});
			chercheur.setTypeInstrumentIrdChercheurs(savedTypeInstrumentIrdChercheurs);
		}
	}

	private void saveInstrumentIrdChercheurs(Chercheur chercheur,
											 List<InstrumentIrdChercheur> instrumentIrdChercheurs) {

		if (ListUtil.isNotEmpty(chercheur.getInstrumentIrdChercheurs())) {
			List<InstrumentIrdChercheur> savedInstrumentIrdChercheurs = new ArrayList<>();
			instrumentIrdChercheurs.forEach(element -> {
				element.setChercheur(chercheur);
				instrumentIrdChercheurService.save(element);
			});
			chercheur.setInstrumentIrdChercheurs(savedInstrumentIrdChercheurs);
		}
	}

	private void saveDisciplineScientifiqueChercheurs(Chercheur chercheur,
													  List<DisciplineScientifiqueChercheur> disciplineScientifiqueChercheurs) {

		if (ListUtil.isNotEmpty(chercheur.getDisciplineScientifiqueChercheurs())) {
			List<DisciplineScientifiqueChercheur> savedDisciplineScientifiqueChercheurs = new ArrayList<>();
			disciplineScientifiqueChercheurs.forEach(element -> {
				element.setChercheur(chercheur);
				disciplineScientifiqueChercheurService.save(element);
			});
			chercheur.setDisciplineScientifiqueChercheurs(savedDisciplineScientifiqueChercheurs);
		}
	}

	private void saveChercheurEmails(Chercheur chercheur, List<ChercheurEmail> chercheurEmails) {

		if (ListUtil.isNotEmpty(chercheur.getChercheurEmails())) {
			List<ChercheurEmail> savedChercheurEmails = new ArrayList<>();
			chercheurEmails.forEach(element -> {
				element.setChercheur(chercheur);
				chercheurEmailService.save(element);
			});
			chercheur.setChercheurEmails(savedChercheurEmails);
		}
	}

	private void saveEnjeuxIrdChercheurs(Chercheur chercheur, List<EnjeuxIrdChercheur> enjeuxIrdChercheurs) {

		if (ListUtil.isNotEmpty(chercheur.getEnjeuxIrdChercheurs())) {
			List<EnjeuxIrdChercheur> savedEnjeuxIrdChercheurs = new ArrayList<>();
			enjeuxIrdChercheurs.forEach(element -> {
				element.setChercheur(chercheur);
				enjeuxIrdChercheurService.save(element);
			});
			chercheur.setEnjeuxIrdChercheurs(savedEnjeuxIrdChercheurs);
		}
	}

	@Override
	public Chercheur saveFromGraphQl(Chercheur chercheur) {
		Chercheur foundedChercheur = findByIdGraph(chercheur.getIdGraph());
		if (foundedChercheur != null)
			return null;

		/*
		 * users from graphql doesnt have unique email chercheur
		 * =preparedUser(chercheur); if(chercheur ==null ) return null;
		 */

		findPays(chercheur);
		findPaysAffectationGeo(chercheur);
		findCommissionScientifique(chercheur);
		findGrade(chercheur);
		findCorps(chercheur);
		findSexe(chercheur);
		Chercheur savedChercheur = chercheurDao.save(chercheur);
		return savedChercheur;
	}

	@Override
	public Chercheur updateFromGraphQl(Chercheur chercheur) {
		Chercheur foundedChercheur = findByNumeroMatricule(chercheur.getNumeroMatricule());
		Chercheur foundedChercheurByEmail = findByEmail(chercheur.getEmail());
		User foundedUserByEmail = userService.findByEmail(chercheur.getEmail());
		if(foundedChercheur != null)
			return null;
		else if (foundedChercheurByEmail != null || foundedUserByEmail != null) {
			chercheur.setEmail("email deja existe");
			return chercheur;
		}
		prepareChercheurUpdate(chercheur);
		findPays(chercheur);
		findPaysAffectationGeo(chercheur);
		findGrade(chercheur);
		findCorps(chercheur);
		findCommissionScientifique(chercheur);
		findAffectationStructurelle(chercheur);
		findEntiteAdministrative(chercheur);
		findSexe(chercheur);
		saveDepartementScientifiqueFromGraphql(chercheur);
		Chercheur savedChercheur = chercheurDao.save(chercheur);
		return savedChercheur;
	}
	public void saveDepartementScientifiqueFromGraphql(Chercheur chercheur) {
		departementScientifiqueChercheurService.deleteByChercheurId(chercheur.getId());
		if(chercheur.getDepartementScientifiqueChercheurs()!=null && !chercheur.getDepartementScientifiqueChercheurs().isEmpty()) {
			chercheur.getDepartementScientifiqueChercheurs().forEach(departementChercheur->{
				if(departementChercheur.getDepartementScientifique()!=null) {
					DepartementScientifique loadedDepartementScientifique = departementScientifiqueService
							.findByIdOrCode(departementChercheur.getDepartementScientifique());

					if (loadedDepartementScientifique == null) {
						loadedDepartementScientifique=departementScientifiqueService.save(departementChercheur.getDepartementScientifique());
					}
					departementChercheur.setDepartementScientifique(loadedDepartementScientifique);
					departementChercheur.setChercheur(chercheur);
					departementScientifiqueChercheurService.save(departementChercheur);
				}
			});
		}
	}
	@Override
	public List<Chercheur> save(List<Chercheur> chercheurs) {
		List<Chercheur> list = new ArrayList<Chercheur>();
		for (Chercheur chercheur : chercheurs) {
			list.add(save(chercheur));
		}
		return list;
	}

	@Override
	@Transactional
	public int delete(Chercheur chercheur) {
		if (chercheur.getNumeroMatricule() == null)
			return -1;

		Chercheur foundedChercheur = findByNumeroMatricule(chercheur.getNumeroMatricule());
		if (foundedChercheur == null)
			return -1;
		chercheurDao.delete(foundedChercheur);
		return 1;
	}

	public List<Chercheur> findByCriteria(ChercheurVo chercheurVo) {

		String query = "SELECT o FROM Chercheur o where 1=1 ";

		query += SearchUtil.addConstraint("o", "id", "=", chercheurVo.getId());
		query += SearchUtil.addConstraint("o", "numeroMatricule", "LIKE", chercheurVo.getNumeroMatricule());
		query += SearchUtil.addConstraint("o", "consentementRgpd", "=", chercheurVo.getConsentementRgpd());
		query += SearchUtil.addConstraint("o", "email", "LIKE", chercheurVo.getEmail());
		query += SearchUtil.addConstraint("o", "natureImplication", "LIKE", chercheurVo.getNatureImplication());
		query += SearchUtil.addConstraint("o", "resume", "LIKE", chercheurVo.getResume());
		query += SearchUtil.addConstraint("o", "formationEnManagement", "=", chercheurVo.getFormationEnManagement());
		query += SearchUtil.addConstraint("o", "credentialsNonExpired", "=", chercheurVo.getCredentialsNonExpired());
		query += SearchUtil.addConstraint("o", "enabled", "=", chercheurVo.getEnabled());
		query += SearchUtil.addConstraint("o", "archive", "=", chercheurVo.getArchive());
		query += SearchUtil.addConstraintDate("o", "createdAt", "=", chercheurVo.getCreatedAt());
		query += SearchUtil.addConstraintDate("o", "updatedAt", "=", chercheurVo.getUpdatedAt());
		query += SearchUtil.addConstraint("o", "accountNonExpired", "=", chercheurVo.getAccountNonExpired());
		query += SearchUtil.addConstraint("o", "accountNonLocked", "=", chercheurVo.getAccountNonLocked());
		query += SearchUtil.addConstraint("o", "username", "LIKE", chercheurVo.getUsername());
		query += SearchUtil.addConstraint("o", "password", "LIKE", chercheurVo.getPassword());
		query += SearchUtil.addConstraint("o", "prenom", "LIKE", chercheurVo.getPrenom());
		query += SearchUtil.addConstraint("o", "nom", "LIKE", chercheurVo.getNom());
		query += SearchUtil.addConstraint("o", "role", "LIKE", chercheurVo.getRole());
		query += SearchUtil.addConstraint("o", "passwordChanged", "=", chercheurVo.getPasswordChanged());
		query += SearchUtil.addConstraintMinMaxDate("o", "createdAt", chercheurVo.getCreatedAtMin(),
				chercheurVo.getCreatedAtMax());
		query += SearchUtil.addConstraintMinMaxDate("o", "updatedAt", chercheurVo.getUpdatedAtMin(),
				chercheurVo.getUpdatedAtMax());
		query += SearchUtil.addConstraintMinMaxDate("o", "dateArchivage", chercheurVo.getDateArchivageMin(),
				chercheurVo.getDateArchivageMax());
		if (chercheurVo.getTypeEntiteAdministrativeVo() != null) {
			query += SearchUtil.addConstraint("o", "typeEntiteAdministrative.id", "=",
					chercheurVo.getTypeEntiteAdministrativeVo().getId());
			query += SearchUtil.addConstraint("o", "typeEntiteAdministrative.code", "LIKE",
					chercheurVo.getTypeEntiteAdministrativeVo().getCode());
		}

		if (chercheurVo.getEntiteAdministrativeVo() != null) {
			query += SearchUtil.addConstraint("o", "entiteAdministrative.id", "=",
					chercheurVo.getEntiteAdministrativeVo().getId());
			query += SearchUtil.addConstraint("o", "entiteAdministrative.code", "LIKE",
					chercheurVo.getEntiteAdministrativeVo().getCode());
		}

		if (chercheurVo.getPaysVo() != null) {
			query += SearchUtil.addConstraint("o", "pays.id", "=", chercheurVo.getPaysVo().getId());
			query += SearchUtil.addConstraint("o", "pays.code", "LIKE", chercheurVo.getPaysVo().getCode());
		}

		if (chercheurVo.getVilleVo() != null) {
			query += SearchUtil.addConstraint("o", "ville.id", "=", chercheurVo.getVilleVo().getId());
			query += SearchUtil.addConstraint("o", "ville.code", "LIKE", chercheurVo.getVilleVo().getCode());
		}

		if (chercheurVo.getDepartementScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "departementScientifique.id", "=",
					chercheurVo.getDepartementScientifiqueVo().getId());
			query += SearchUtil.addConstraint("o", "departementScientifique.code", "LIKE",
					chercheurVo.getDepartementScientifiqueVo().getCode());
		}

		if (chercheurVo.getCommissionScientifiqueVo() != null) {
			query += SearchUtil.addConstraint("o", "commissionScientifique.id", "=",
					chercheurVo.getCommissionScientifiqueVo().getId());
			query += SearchUtil.addConstraint("o", "commissionScientifique.code", "LIKE",
					chercheurVo.getCommissionScientifiqueVo().getCode());
		}

		if (chercheurVo.getGradeVo() != null) {
			query += SearchUtil.addConstraint("o", "grade.id", "=", chercheurVo.getGradeVo().getId());
			query += SearchUtil.addConstraint("o", "grade.code", "LIKE", chercheurVo.getGradeVo().getCode());
		}

		if (chercheurVo.getCorpsVo() != null) {
			query += SearchUtil.addConstraint("o", "corps.id", "=", chercheurVo.getCorpsVo().getId());
			query += SearchUtil.addConstraint("o", "corps.code", "LIKE", chercheurVo.getCorpsVo().getCode());
		}

		if (chercheurVo.getSexeVo() != null) {
			query += SearchUtil.addConstraint("o", "sexe.id", "=", chercheurVo.getSexeVo().getId());
			query += SearchUtil.addConstraint("o", "sexe.code", "LIKE", chercheurVo.getSexeVo().getCode());
		}

		return entityManager.createQuery(query).getResultList();
	}

	private void saveZoneActiviteInteractionRecherches(Chercheur chercheur,
													   List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherches) {

		if (ListUtil.isNotEmpty(chercheur.getZoneActiviteInteractionRecherches())) {
			List<ZoneActiviteInteractionRecherche> savedZoneActiviteInteractionRecherches = new ArrayList<>();
			zoneActiviteInteractionRecherches.forEach(element -> {
				element.setChercheur(chercheur);
				zoneActiviteInteractionRechercheService.save(element);
			});
			chercheur.setZoneActiviteInteractionRecherches(savedZoneActiviteInteractionRecherches);
		}
	}

	private void saveCommunauteSavoirChercheurs(Chercheur chercheur,
												List<CommunauteSavoirChercheur> communauteSavoirChercheurs) {

		if (ListUtil.isNotEmpty(chercheur.getCommunauteSavoirChercheurs())) {
			List<CommunauteSavoirChercheur> savedCommunauteSavoirChercheurs = new ArrayList<>();
			communauteSavoirChercheurs.forEach(element -> {
				element.setChercheur(chercheur);
				communauteSavoirChercheurService.save(element);
			});
			chercheur.setCommunauteSavoirChercheurs(savedCommunauteSavoirChercheurs);
		}
	}

	private void saveIdentifiantAuteurExperts(Chercheur chercheur,
											  List<IdentifiantAuteurExpert> identifiantAuteurExperts) {

		if (ListUtil.isNotEmpty(chercheur.getIdentifiantAuteurExperts())) {
			List<IdentifiantAuteurExpert> savedIdentifiantAuteurExperts = new ArrayList<>();
			identifiantAuteurExperts.forEach(element -> {
				element.setChercheur(chercheur);
				identifiantAuteurExpertService.save(element);
			});
			chercheur.setIdentifiantAuteurExperts(savedIdentifiantAuteurExperts);
		}
	}

	private void findTypeEntiteAdministrative(Chercheur chercheur) {
		TypeEntiteAdministrative loadedTypeEntiteAdministrative = typeEntiteAdministrativeService
				.findByIdOrCode(chercheur.getTypeEntiteAdministrative());

		if (loadedTypeEntiteAdministrative == null) {
			return;
		}
		chercheur.setTypeEntiteAdministrative(loadedTypeEntiteAdministrative);
	}

	private void findEntiteAdministrative(Chercheur chercheur) {
		EntiteAdministrative loadedEntiteAdministrative = entiteAdministrativeService
				.findByIdOrCode(chercheur.getEntiteAdministrative());

		if (loadedEntiteAdministrative == null && chercheur.getEntiteAdministrative() != null) {
			loadedEntiteAdministrative = entiteAdministrativeService.save(chercheur.getEntiteAdministrative());
		}
		chercheur.setEntiteAdministrative(loadedEntiteAdministrative);
	}

	private void findPaysAffectationGeo(Chercheur chercheur) {
		Pays loadedPays = paysService.findByIdOrCode(chercheur.getPaysAffectationGeo());

		if (loadedPays == null && chercheur.getPaysAffectationGeo() != null) {
			loadedPays = paysService.save(chercheur.getPaysAffectationGeo());
		}

		chercheur.setPaysAffectationGeo(loadedPays);
	}

	private void findPays(Chercheur chercheur) {
		Pays loadedPays = paysService.findByIdOrCode(chercheur.getPays());

		if (loadedPays == null && chercheur.getPays() != null) {
			loadedPays = paysService.save(chercheur.getPays());
		}

		chercheur.setPays(loadedPays);
	}

	private void findVille(Chercheur chercheur) {
		Ville loadedVille = villeService.findByIdOrCode(chercheur.getVille());

		if (loadedVille == null) {
			return;
		}
		chercheur.setVille(loadedVille);
	}

	private void findDepartementScientifique(Chercheur chercheur) {
		DepartementScientifique loadedDepartementScientifique = departementScientifiqueService
				.findByIdOrCode(chercheur.getDepartementScientifique());

		if (loadedDepartementScientifique == null) {
			return;
		}
		chercheur.setDepartementScientifique(loadedDepartementScientifique);
	}

	private void findCommissionScientifique(Chercheur chercheur) {
		CommissionScientifique loadedCommissionScientifique = commissionScientifiqueService
				.findByIdOrCode(chercheur.getCommissionScientifique());

		if (loadedCommissionScientifique == null && chercheur.getCommissionScientifique() != null) {
			loadedCommissionScientifique = commissionScientifiqueService.save(chercheur.getCommissionScientifique());
		}

		chercheur.setCommissionScientifique(loadedCommissionScientifique);

	}

	private void findAffectationStructurelle(Chercheur chercheur) {
		AffectationStructurelle loadedAffectationStructurelle = affectationStructurelleService
				.findByIdOrCode(chercheur.getAffectationStructurelle());

		if (loadedAffectationStructurelle == null && chercheur.getAffectationStructurelle() != null) {
			loadedAffectationStructurelle = affectationStructurelleService.save(chercheur.getAffectationStructurelle());
		}
		chercheur.setAffectationStructurelle(loadedAffectationStructurelle);
	}

	private void findGrade(Chercheur chercheur) {
		Grade loadedGrade = gradeService.findByIdOrCode(chercheur.getGrade());

		if (loadedGrade == null && chercheur.getGrade() != null) {
			loadedGrade = gradeService.save(chercheur.getGrade());
		}

		chercheur.setGrade(loadedGrade);
	}

	private void findCorps(Chercheur chercheur) {
		Corps loadedCorps = corpsService.findByIdOrCode(chercheur.getCorps());

		if (loadedCorps == null && chercheur.getCorps() != null) {
			loadedCorps = corpsService.save(chercheur.getCorps());
		}

		chercheur.setCorps(loadedCorps);
	}

	private void findSexe(Chercheur chercheur) {
		Sexe loadedSexe = sexeService.findByIdOrCode(chercheur.getSexe());

		if (loadedSexe == null && chercheur.getSexe() != null) {
			loadedSexe = sexeService.save(chercheur.getSexe());
		}
		chercheur.setSexe(loadedSexe);
	}

	@Override
	@Transactional
	public void delete(List<Chercheur> chercheurs) {
		if (ListUtil.isNotEmpty(chercheurs)) {
			chercheurs.forEach(e -> chercheurDao.delete(e));
		}
	}

	@Override
	public void update(List<Chercheur> chercheurs) {
		if (ListUtil.isNotEmpty(chercheurs)) {
			chercheurs.forEach(e -> chercheurDao.save(e));
		}
	}

	private void associateTypeInstrumentIrdChercheur(Chercheur chercheur,
													 List<TypeInstrumentIrdChercheur> typeInstrumentIrdChercheur) {
		if (ListUtil.isNotEmpty(typeInstrumentIrdChercheur)) {
			typeInstrumentIrdChercheur.forEach(e -> e.setChercheur(chercheur));
		}
	}

	private void associateEnjeuxIrdChercheur(Chercheur chercheur, List<EnjeuxIrdChercheur> enjeuxIrdChercheur) {
		if (ListUtil.isNotEmpty(enjeuxIrdChercheur)) {
			enjeuxIrdChercheur.forEach(e -> e.setChercheur(chercheur));
		}
	}

	private void associateChercheurEmail(Chercheur chercheur, List<ChercheurEmail> chercheurEmail) {
		if (ListUtil.isNotEmpty(chercheurEmail)) {
			chercheurEmail.forEach(e -> e.setChercheur(chercheur));
		}
	}

	private void associateZoneActiviteInteractionRecherche(Chercheur chercheur,
														   List<ZoneActiviteInteractionRecherche> zoneActiviteInteractionRecherche) {
		if (ListUtil.isNotEmpty(zoneActiviteInteractionRecherche)) {
			zoneActiviteInteractionRecherche.forEach(e -> e.setChercheur(chercheur));
		}
	}

	private void associateCommunauteSavoirChercheur(Chercheur chercheur,
													List<CommunauteSavoirChercheur> communauteSavoirChercheur) {
		if (ListUtil.isNotEmpty(communauteSavoirChercheur)) {
			communauteSavoirChercheur.forEach(e -> e.setChercheur(chercheur));
		}
	}

	private void associateIdentifiantAuteurExpert(Chercheur chercheur,
												  List<IdentifiantAuteurExpert> identifiantAuteurExpert) {
		if (ListUtil.isNotEmpty(identifiantAuteurExpert)) {
			identifiantAuteurExpert.forEach(e -> e.setChercheur(chercheur));
		}
	}

	@Override
	public List<List<Chercheur>> getToBeSavedAndToBeDeleted(List<Chercheur> oldList, List<Chercheur> newList) {
		return super.getToBeSavedAndToBeDeleted(oldList, newList);
	}

	@Override
	public List<Chercheur> findByCampagneId(Long id) {
		List<Chercheur> chercheurs = new ArrayList<>();
		List<CampagneChercheurOuverture> campagneChercheurOuvertures = campagneChercheurOuvertureDao
				.findByCampagneId(id);
		if (campagneChercheurOuvertures != null) {
			campagneChercheurOuvertures.forEach(el -> {
				Chercheur chercheur = el.getChercheur();
				chercheurs.add(chercheur);
			});

		}

		return chercheurs;
	}

	@Override
	public Chercheur findByIdGraph(String idGraph) {
		if (idGraph == null || StringUtil.isEmpty(idGraph))
			return null;
		return chercheurDao.findByIdGraph(idGraph);
	}

}
