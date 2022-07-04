package com.ird.faa.service.admin.facade.formulaire;

import java.util.Map;

import com.ird.faa.bean.formulaire.Chercheur;
import com.ird.faa.ws.rest.provided.dto.PersonnePhysiqueDto;
import com.ird.faa.ws.rest.provided.dto.PersonnesPhysiqueDto;

public interface ChercheursImportService {
  public PersonnesPhysiqueDto getChercheurs();
  public Map<String,Object> updateOrAddChercheur();
  public PersonnePhysiqueDto getDetailChercheur(Chercheur chercheur);
  public Map<String, Object> updateChercheur(Chercheur chercheur);
}
