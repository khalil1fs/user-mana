package com.ird.faa.service.admin.impl.formulaire;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.ird.faa.service.admin.facade.formulaire.GraphqlService;
import com.ird.faa.ws.rest.provided.dto.TokenDto;


@Service
public class GraphqlServiceImpl implements GraphqlService{
	 @Autowired
	 private RestTemplate restTemplate;
	 @Value("${graphql.urlToken}")
	 private String urlToken;
	 @Value("${graphql.client_secret}")
	 private String clientSecret;
	 @Value("${graphql.client_id}")
	 private String clientId;
	
	@Override
	public ResponseEntity<String> executeQuery(String url,String query) {
		TokenDto token=getToken();
		if(token !=null) {
			String accessToken=token.getAccessToken();
			HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_JSON);
		    headers.add("Authorization"," Bearer "+accessToken);
		    ResponseEntity<String> response = restTemplate.postForEntity(url, new HttpEntity<>(query,headers), String.class);
		    return response;
		}
		return null;
	}

	@Override
	public TokenDto getToken() {
		HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
	    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	    //headers.add("Authorization","Basic Og==");
	    MultiValueMap<String, String> params=new LinkedMultiValueMap<String, String>();
	    params.add("grant_type", "client_credentials");
        params.add("client_secret", clientSecret);
        params.add("client_id",clientId);
	    
	    ResponseEntity<TokenDto> response = restTemplate.postForEntity(urlToken, new HttpEntity<>(params,headers), TokenDto.class);
	    
	    if(response.getStatusCodeValue()==200) {
	    	return response.getBody();
	    }
	    
		return null;
	}



}
